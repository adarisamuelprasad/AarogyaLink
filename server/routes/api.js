const express = require('express');
const router = express.Router();
let hospitals = require('../data/dummyHospitals');

const normalizeSymptoms = (symptomsInput) => {
    return symptomsInput
        .toLowerCase()
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .sort()
        .join(',');
};

const getDiseaseFromGemini = async (symptoms, gender, age, previouslyFaced, howLongAgo, symptomDuration) => {
    // Prompt is now slightly less specific, as we'll do post-processing
    let prompt = `Analyze the following user's health information and determine the most probable medical condition or disease. 
    Provide only the disease name, without any additional text or explanation. 
    If you cannot determine a specific disease, respond with "General consultation".

    User Information:
    - Symptoms: ${symptoms}
    - Gender: ${gender || 'Not specified'}
    - Age: ${age || 'Not specified'}
    - Previously faced this issue: ${previouslyFaced || 'Not specified'}
    - If so, how long ago: ${howLongAgo || 'Not specified'}
    - Symptoms duration: ${symptomDuration || 'Not specified'}`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = {
        contents: chatHistory,
        generationConfig: {
            temperature: 0.2, 
        }
    };

    const apiKey = ""; // Canvas will automatically provide this API key at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const maxRetries = 3;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Gemini API error (Status: ${response.status}):`, errorData);
                throw new Error(`Gemini API responded with status ${response.status}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                return text.trim(); 
            } else {
                console.warn("Gemini API response structure unexpected:", result);
                return "General consultation";
            }
        } catch (error) {
            console.error(`Error calling Gemini API (retry ${retries + 1}/${maxRetries}):`, error);
            retries++;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
        }
    }
    console.error("Max retries reached for Gemini API call.");
    return "General consultation";
};

// --- NEW: Post-processing function to refine LLM diagnosis ---
const postProcessDiagnosis = (llmDiagnosis, symptoms, gender, age, previouslyFaced, howLongAgo, symptomDuration) => {
    let finalDiagnosis = llmDiagnosis;

    const lowerCaseSymptoms = symptoms.toLowerCase();
    const lowerCaseGender = gender ? gender.toLowerCase() : '';
    const lowerCasePreviouslyFaced = previouslyFaced ? previouslyFaced.toLowerCase() : '';
    const lowerCaseHowLongAgo = howLongAgo ? howLongAgo.toLowerCase() : '';
    const lowerCaseSymptomDuration = symptomDuration ? symptomDuration.toLowerCase() : '';

    // Rule 1: Female-specific abdominal/stomach pain, recurrent, possibly menstrual
    if (lowerCaseGender === 'female' && 
        (lowerCaseSymptoms.includes('stomach pain') || lowerCaseSymptoms.includes('abdominal pain')) &&
        lowerCasePreviouslyFaced === 'yes' &&
        (lowerCaseHowLongAgo.includes('month') || lowerCaseHowLongAgo.includes('cycle') || lowerCaseHowLongAgo.includes('period'))
    ) {
        // If LLM gave a general GI diagnosis, refine it
        if (finalDiagnosis.toLowerCase().includes('gastroenterology') || finalDiagnosis.toLowerCase().includes('general consultation')) {
            finalDiagnosis = "Menstrual Disorder / Gynecological Concern";
        }
    }
    // Rule 2: Pediatric conditions based on age
    if (age && age < 12) {
        if (finalDiagnosis.toLowerCase().includes("flu")) finalDiagnosis = "Pediatric Flu";
        if (finalDiagnosis.toLowerCase().includes("fever")) finalDiagnosis = "Childhood Fever";
        if (finalDiagnosis.toLowerCase().includes("gastroenterology")) finalDiagnosis = "Pediatric Gastroenteritis";
    }
    // Rule 3: Geriatric conditions based on age
    else if (age && age >= 60) {
        if (finalDiagnosis.toLowerCase().includes("cardiac issue")) finalDiagnosis = "Geriatric Cardiac Care";
        if (finalDiagnosis.toLowerCase().includes("orthopedic")) finalDiagnosis = "Age-related Orthopedic Issue";
        if (finalDiagnosis.toLowerCase().includes("diabetes")) finalDiagnosis = "Type 2 Diabetes (Geriatric)";
    }
    // Rule 4: Chronic based on duration/history
    if (lowerCasePreviouslyFaced === 'yes' && (lowerCaseHowLongAgo.includes("year") || lowerCaseHowLongAgo.includes("months"))) {
        if (finalDiagnosis.toLowerCase().includes("migraine")) finalDiagnosis = "Recurrent Migraine";
        if (finalDiagnosis.toLowerCase().includes("diabetes")) finalDiagnosis = "Chronic Diabetes Management";
        if (finalDiagnosis.toLowerCase().includes("cardiac issue")) finalDiagnosis = "Chronic Cardiac Condition";
    }
    // Rule 5: Persistent symptoms
    if (lowerCaseSymptomDuration.includes("weeks") || lowerCaseSymptomDuration.includes("month")) {
        if (finalDiagnosis.toLowerCase().includes("flu")) finalDiagnosis = "Persistent Flu Symptoms";
        if (finalDiagnosis.toLowerCase().includes("cough")) finalDiagnosis = "Chronic Cough";
        if (finalDiagnosis.toLowerCase().includes("headache")) finalDiagnosis = "Persistent Headaches";
    }

    // You can add more specific post-processing rules here
    // Example: if (lowerCaseSymptoms.includes('burning urination') && lowerCaseGender === 'female') finalDiagnosis = "Urinary Tract Infection";

    return finalDiagnosis;
};


// POST /analyzeSymptoms
router.post('/analyzeSymptoms', async (req, res) => {
    const { symptoms, gender, age, previouslyFaced, howLongAgo, symptomDuration } = req.body;
    
    if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required." });
    }

    // 1. Get initial diagnosis from Gemini
    const initialProbableDisease = await getDiseaseFromGemini(
        symptoms,
        gender,
        age,
        previouslyFaced,
        howLongAgo,
        symptomDuration
    );

    // 2. Post-process the diagnosis based on specific rules
    const finalProbableDisease = postProcessDiagnosis(
        initialProbableDisease,
        symptoms,
        gender,
        age,
        previouslyFaced,
        howLongAgo,
        symptomDuration
    );

    res.json({ disease: finalProbableDisease });
});

// GET /hospitals (uses Google Places API)
const getHospitalsFromGoogle = async (disease, city, scheme, insurance) => {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Get Google API key from environment variables
    if (!GOOGLE_API_KEY) {
        console.error("GOOGLE_API_KEY is not set in environment variables.");
        return [];
    }

    const query = `hospitals in ${city} for ${disease}`;
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=hospital&key=${GOOGLE_API_KEY}`;

    const maxRetries = 3;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const response = await fetch(googleApiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Google Places API error (Status: ${response.status}):`, errorData);
                throw new Error(`Google Places API responded with status ${response.status}`);
            }

            const data = await response.json();
            if (data.results) {
                // Mock filtering for scheme and insurance as Google Places API doesn't provide this
                let filteredResults = data.results.map(place => ({
                    id: place.place_id,
                    name: place.name,
                    address: place.formatted_address,
                    city: city, // Use the requested city
                    diseasesTreated: [disease, "General consultation"], // Assume they treat the queried disease and general cases
                    schemesAccepted: ["Arogyasri", "PMJAY"], // Mock common schemes
                    insurancePartners: ["Aetna", "Cigna", "UnitedHealthcare", "Bajaj Allianz", "HDFC Ergo", "Star Health"] // Mock common partners
                }));

                // Apply mock filtering based on user input for scheme/insurance
                if (scheme) {
                    const lowerCaseScheme = scheme.toLowerCase();
                    filteredResults = filteredResults.filter(hospital =>
                        hospital.schemesAccepted.some(s => s.toLowerCase().includes(lowerCaseScheme))
                    );
                }
                if (insurance) {
                    const lowerCaseInsurance = insurance.toLowerCase();
                    filteredResults = filteredResults.filter(hospital =>
                        hospital.insurancePartners.some(p => p.toLowerCase().includes(lowerCaseInsurance))
                    );
                }

                // Limit to top 10 results for brevity
                return filteredResults.slice(0, 10); 
            } else {
                console.warn("Google Places API response unexpected:", data);
                return [];
            }
        } catch (error) {
            console.error(`Error calling Google Places API (retry ${retries + 1}/${maxRetries}):`, error);
            retries++;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
        }
    }
    console.error("Max retries reached for Google Places API call.");
    return [];
};


router.get('/hospitals', async (req, res) => {
    const { disease, city, scheme, insurance } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City is required for hospital search." });
    }

    const dynamicHospitals = await getHospitalsFromGoogle(disease, city, scheme, insurance);

    res.json(dynamicHospitals);
});


router.post('/addHospital', (req, res) => {
    const newHospital = {
        id: hospitals.length + 1,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        diseasesTreated: Array.isArray(req.body.diseasesTreated) ? req.body.diseasesTreated : req.body.diseasesTreated.split(',').map(s => s.trim()),
        schemesAccepted: Array.isArray(req.body.schemesAccepted) ? req.body.schemesAccepted : req.body.schemesAccepted.split(',').map(s => s.trim()),
        insurancePartners: Array.isArray(req.body.insurancePartners) ? req.body.insurancePartners : req.body.insurancePartners.split(',').map(s => s.trim())
    };
    hospitals.push(newHospital);
    res.status(201).json(newHospital);
});

router.get('/allHospitals', (req, res) => {
    res.json(hospitals);
});

module.exports = router;

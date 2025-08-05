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
    // Construct a detailed prompt for the Gemini API
    let prompt = `Analyze the following user's health information and determine the most probable medical condition or disease. 
    Provide only the disease name, without any additional text or explanation. 
    If you cannot determine a specific disease, respond with "General consultation".

    When analyzing, pay very close attention to the user's gender, age, and history.
    Specifically, if 'stomach pain' or 'abdominal pain' is a symptom for a female user, prioritize considering gynecological, reproductive, or menstrual issues (like Dysmenorrhea or Endometriosis) if the recurrence or duration aligns with menstrual cycles (e.g., 'monthly', 'last month'). Also consider urinary tract issues. Only if these are less likely, then consider gastrointestinal causes.

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

router.post('/analyzeSymptoms', async (req, res) => {
    const { symptoms, gender, age, previouslyFaced, howLongAgo, symptomDuration } = req.body;
    
    if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required." });
    }

    const probableDisease = await getDiseaseFromGemini(
        symptoms,
        gender,
        age,
        previouslyFaced,
        howLongAgo,
        symptomDuration
    );

    res.json({ disease: probableDisease });
});

router.get('/hospitals', (req, res) => {
    const { disease, city, scheme, insurance } = req.query;

    let filteredHospitals = hospitals;

    if (disease) {
        const lowerCaseDisease = disease.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.diseasesTreated.some(d => d.toLowerCase().includes(lowerCaseDisease))
        );
    }
    
    if (city) {
        const lowerCaseCity = city.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.city.toLowerCase() === lowerCaseCity
        );
    }

    if (scheme) {
        const lowerCaseScheme = scheme.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.schemesAccepted.some(s => s.toLowerCase() === lowerCaseScheme)
        );
    }

    if (insurance) {
        const lowerCaseInsurance = insurance.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.insurancePartners.some(p => p.toLowerCase() === lowerCaseInsurance)
        );
    }

    res.json(filteredHospitals);
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

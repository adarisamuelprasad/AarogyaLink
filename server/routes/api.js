const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load API keys
const geminiApiKey = process.env.GEMINI_API_KEY;
const googleApiKey = process.env.GOOGLE_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Simplified keyword mapping
const keywordMapping = {
    'cardiac': 'cardiology hospital', 'heart': 'cardiology hospital', 'chest pain': 'cardiology hospital',
    'stroke': 'neurology hospital', 'brain': 'neurology hospital',
    'breathing': 'pulmonology hospital', 'respiratory': 'pulmonology hospital',
    'accident': 'emergency hospital', 'trauma': 'emergency hospital',
    'menstrual': 'gynecology hospital', 'gynecological': 'gynecology hospital',
    'pregnancy': 'maternity hospital',
    'skin': 'dermatology hospital', 'rash': 'dermatology hospital',
    'stomach': 'gastroenterology hospital',
    'bone': 'orthopedic hospital', 'joint': 'orthopedic hospital',
    'child': 'pediatric hospital', 'baby': 'pediatric hospital',
    'eye': 'eye hospital',
    'kidney': 'nephrology hospital'
};

const getSearchKeyword = (disease) => {
    const diseaseLower = disease.toLowerCase();
    for (const key in keywordMapping) {
        if (diseaseLower.includes(key)) {
            return keywordMapping[key];
        }
    }
    return 'hospital'; // Default to a general hospital search
};

// Endpoint 1: Symptom Analysis (Unchanged)
router.post('/analyzeSymptoms', async (req, res) => {
    const { symptoms, gender, age, previouslyFaced, howLongAgo, symptomDuration } = req.body;

    if (!symptoms || !age || !gender) {
        return res.status(400).json({ error: "Symptoms, age, and gender are required." });
    }

    const prompt = `
        You are a cautious and balanced AI medical assistant. Your task is to provide a differential diagnosis based on patient information.
        Patient Information: - Symptoms: "${symptoms}", Age: ${age}, Gender: ${gender}
        Instructions:
        1.  ALWAYS consider the most common and least severe possibilities first.
        2.  Provide a list of up to 3 possible conditions, from most likely to least likely.
        3.  Return your response as a JSON array of objects. Each object must have two keys: "diagnosis" and "reason".
        Example for "cramps, stomach pain":
        [
            {"diagnosis": "Menstrual Cramps", "reason": "Common symptoms associated with the menstrual cycle."},
            {"diagnosis": "Gastrointestinal Issue", "reason": "Could be related to digestive issues."}
        ]
        Now, analyze the patient information and provide your JSON array response.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonResponseText = response.text().trim().replace(/```json/g, '').replace(/```/g, '');
        const aiResponse = JSON.parse(jsonResponseText);

        console.log("Gemini Diagnosis Array:", aiResponse);
        res.json({ diagnoses: aiResponse });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "Failed to analyze symptoms." });
    }
});

// Endpoint 2: Simplified and Fast Hospital Search
router.get('/hospitals', async (req, res) => {
    const { disease, city } = req.query;

    if (!city) return res.status(400).json({ error: "City is required." });

    try {
        const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: { address: city, key: googleApiKey }
        });

        if (geocodeResponse.data.status !== 'OK' || !geocodeResponse.data.results[0]) {
            return res.status(404).json({ error: `Could not find location: ${city}` });
        }

        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
        const location = `${lat},${lng}`;
        
        const specialistKeyword = getSearchKeyword(disease);

        const placesResponse = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location,
                rankby: 'distance',
                keyword: specialistKeyword,
                type: 'hospital',
                key: googleApiKey
            }
        });

        if (placesResponse.data.status === 'ZERO_RESULTS' && specialistKeyword !== 'hospital') {
            console.log(`No specialists found. Falling back to general hospital search.`);
            const generalResponse = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: { location, rankby: 'distance', type: 'hospital', key: googleApiKey }
            });
            placesResponse.data.results = generalResponse.data.results;
        }

        // --- CHANGE IS HERE: Map results and limit to the top 10 ---
        const hospitals = (placesResponse.data.results || []).slice(0, 10).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            isOpen: place.opening_hours ? place.opening_hours.open_now : null,
            diseasesTreated: [disease]
        }));
        
        res.json(hospitals);

    } catch (error) {
        console.error("Error fetching hospitals:", error.message);
        res.status(500).json({ error: "Failed to fetch hospitals." });
    }
});

module.exports = router;
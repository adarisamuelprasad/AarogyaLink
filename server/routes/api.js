const express = require('express');
const router = express.Router();
// Assuming dummyHospitals.js is in the same directory or correctly path-referenced
let hospitals = require('../data/dummyHospitals'); // Ensure this path is correct

// --- Disease Mapping Logic (Expanded for more flexibility and case-insensitivity) ---
const diseaseMapping = {
    // Specific combinations (sorted alphabetically for consistent keys)
    "body aches,cough,fatigue,fever,sore throat": "Flu",
    "breathlessness,chest pain": "Cardiac issue",
    "blurred vision,headache,nausea,sensitivity to light": "Migraine",
    "abdominal pain,constipation,diarrhea,nausea,vomiting": "Gastroenterology",
    "chills,cough with phlegm,fever,shortness of breath": "Pneumonia",
    "difficulty moving,joint pain,stiffness,swelling": "Orthopedic",
    "dizziness,numbness,seizures,tingling,weakness": "Neuro",
    "high fever,joint pain,rash,severe headache": "Dengue",
    "frequent urination,increased thirst,unexplained weight loss": "Diabetes",
    "persistent pain,unexplained weight loss": "Cancer",
    "ear ache,nasal congestion,sore throat,swallowing difficulty": "ENT",
    "blood in urine,painful urination,frequent urination,kidney pain": "Urology",

    // Common single symptoms or general terms mapped to broader categories
    "fever": "Flu",
    "cough": "Flu",
    "chest pain": "Cardiac issue",
    "headache": "Migraine",
    "diabetes": "Diabetes",
    "dengue": "Dengue",
    "typhoid": "Typhoid",
    "pneumonia": "Pneumonia",
    "joint pain": "Orthopedic",
    "numbness": "Neuro",
    "cancer": "Cancer",
    "maternity": "Maternity",
    "pediatric": "Pediatric",
    "stomach pain": "Gastroenterology",
    "eye pain": "Ophthalmology",
    "ear ache": "ENT",
    "kidney pain": "Urology",
    "infection": "General consultation", // Can be general
    "cold": "Flu",
    "sore throat": "Flu",
    "back pain": "Orthopedic",
    "dizziness": "Neuro",
    "rash": "General consultation",
    "vomiting": "Gastroenterology",
    "diarrhea": "Gastroenterology",
    "pregnancy": "Maternity",
    "child fever": "Pediatric",
    "eye infection": "Ophthalmology",
    "urination pain": "Urology",
    "general check-up": "General consultation",
    "routine checkup": "General consultation"
};

// Helper function to normalize symptoms for mapping
const normalizeSymptoms = (symptomsInput) => {
    return symptomsInput
        .toLowerCase()
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .sort()
        .join(',');
};

// POST /analyzeSymptoms
router.post('/analyzeSymptoms', (req, res) => {
    const { symptoms } = req.body;
    if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required." });
    }

    const normalizedSymptoms = normalizeSymptoms(symptoms);
    let probableDisease = "General consultation"; // Default fallback

    // Try to match exact combinations first
    if (diseaseMapping[normalizedSymptoms]) {
        probableDisease = diseaseMapping[normalizedSymptoms];
    } else {
        // If no exact combination, try matching individual keywords
        const symptomKeywords = normalizedSymptoms.split(',');
        for (const keyword of symptomKeywords) {
            if (diseaseMapping[keyword]) {
                probableDisease = diseaseMapping[keyword];
                break; // Found a match, use it
            }
        }
    }

    res.json({ disease: probableDisease });
});

// GET /hospitals?disease=X&city=Y&scheme=Z&insurance=A
router.get('/hospitals', (req, res) => {
    const { disease, city, scheme, insurance } = req.query;

    let filteredHospitals = hospitals;

    // Filter by disease (case-insensitive)
    if (disease) {
        const lowerCaseDisease = disease.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.diseasesTreated.some(d => d.toLowerCase() === lowerCaseDisease)
        );
    }
    
    // Filter by city (case-insensitive)
    if (city) {
        const lowerCaseCity = city.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.city.toLowerCase() === lowerCaseCity
        );
    }

    // Filter by scheme (case-insensitive)
    if (scheme) {
        const lowerCaseScheme = scheme.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.schemesAccepted.some(s => s.toLowerCase() === lowerCaseScheme)
        );
    }

    // Filter by insurance (case-insensitive)
    if (insurance) {
        const lowerCaseInsurance = insurance.toLowerCase();
        filteredHospitals = filteredHospitals.filter(hospital =>
            hospital.insurancePartners.some(p => p.toLowerCase() === lowerCaseInsurance)
        );
    }

    res.json(filteredHospitals);
});

// POST /addHospital
router.post('/addHospital', (req, res) => {
    const newHospital = {
        id: hospitals.length + 1, // Simple ID generation
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

// GET /allHospitals
router.get('/allHospitals', (req, res) => {
    res.json(hospitals);
});

module.exports = router;
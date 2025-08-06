import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// SVG Icons (Adapted from DocLink.AI reference or common libraries like Lucide/Feather)
const IconHome = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>);
const IconAdmin = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.142-1.282-.416-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.142-1.282.416-1.857m0 0a5.002 5.002 0 019.168 0m0 0c-.653-.142-1.282-.416-1.857.416m-1.857.416A5.002 5.002 0 0212 13a5.002 5.002 0 02-3.857 1.857m0 0C7.142 16.282 7 16.911 7 17.564"></path></svg>);
const IconSearch = () => (<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>);

// Hero Section Icons (from previous design, adapted for new colors)
const IconPatients = () => (<svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.656A4 4 0 0112 4.354zM12 15a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4z"></path></svg>);
const IconHospitals = () => (<svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10v6m0 0v-6m0 6h16m0 0V8m0 0v8m0-8h-4m-4 0h-4m-4 0h-4M4 8h16M4 8a2 2 0 012-2h12a2 2 0 012 2M4 18h16a2 2 0 002-2v-6a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>);
const IconSuccess = () => (<svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);
const IconSecurity = () => (<svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);

// Symptom Analysis Form Icons (adapted for new design)
const IconSymptoms = () => (<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>);
const IconGender = () => (<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>);
const IconAge = () => (<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>);
const IconPreviouslyFaced = () => (<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.247a4.75 4.75 0 010 5.506L15.66 21H20a2 2 0 002-2V7a2 2 0 00-2-2h-4.34l-7.432 4.247z"></path></svg>);
const IconDuration = () => (<svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);
const IconCity = () => (<svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
const IconScheme = () => (<svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v6m-3-3h6m-3-3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);
const IconInsurance = () => (<svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.016M2.944 12A11.955 11.955 0 0112 21.056a11.955 11.955 0 018.618-4.016M21.056 12A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.016"></path></svg>);
const IconUpload = () => (<svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>);

// How It Works Icons (adapted for new design)
const IconIntelligentAnalysis = () => (<svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>);
const IconHospitalMatching = () => (<svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
const IconInsuranceIntegration = () => (<svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);


// Modal Icons
const IconCheckCircle = () => (<svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);
const IconPhone = () => (<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>);
const IconDirections = () => (<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);


function HomePage() {
    // State for the User Input section
    const [symptoms, setSymptoms] = useState('');
    const [city, setCity] = useState('');
    const [scheme, setScheme] = useState('');
    const [insurance, setInsurance] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [disease, setDisease] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // State for additional input fields
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [previouslyFaced, setPreviouslyFaced] = useState(''); // 'yes', 'no', or ''
    const [howLongAgo, setHowLongAgo] = useState(''); // e.g., "3 months", "1 year"
    const [symptomDuration, setSymptomDuration] = useState(''); // e.g., "5 days", "2 weeks"

    // State for modal visibility and content
    const [showHospitalsModal, setShowHospitalsModal] = useState(false);
    const [recommendations, setRecommendations] = useState([]); // For diagnosis-specific recommendations

    // Function to handle symptom submission
    const handleSymptomSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setHospitals([]);
        setDisease('');
        setMessage('');
        setRecommendations([]); // Clear previous recommendations
        setShowHospitalsModal(false); // Close modal on new submission

        try {
            const payload = {
                symptoms,
                gender,
                age: parseInt(age, 10) || 0,
                previouslyFaced,
                howLongAgo: previouslyFaced === 'yes' ? howLongAgo : '',
                symptomDuration,
                city,
                scheme,
                insurance
            };

            // Step 1: Analyze symptoms using Gemini API
            const symptomResponse = await axios.post('https://aarogyalink.onrender.com/api/analyzeSymptoms', payload);
            const probableDisease = symptomResponse.data.disease;
            setDisease(probableDisease);

            // Mock recommendations based on probable disease
            let mockRecs = [];
            if (probableDisease.toLowerCase().includes('flu')) {
                mockRecs = ["Consult with a general physician", "Get plenty of rest and fluids", "Consider over-the-counter flu medication"];
            } else if (probableDisease.toLowerCase().includes('cardiac')) {
                mockRecs = ["Consult a cardiologist immediately", "Avoid strenuous activities", "Monitor blood pressure regularly"];
            } else if (probableDisease.toLowerCase().includes('menstrual')) {
                mockRecs = ["Consult a gynecologist", "Consider pain management options", "Track your cycle"];
            } else {
                mockRecs = ["Consult a general physician", "Describe your symptoms in detail", "Follow up if symptoms worsen"];
            }
            setRecommendations(mockRecs);
            
            // Step 2: Fetch hospitals from Google Places API
            const hospitalResponse = await axios.get('https://aarogyalink.onrender.com/api/hospitals', {
                params: {
                    disease: probableDisease,
                    city,
                    scheme,
                    insurance
                }
            });
            
            if (hospitalResponse.data.length > 0) {
                setHospitals(hospitalResponse.data);
                setShowHospitalsModal(true); // Open modal if hospitals found
            } else {
                setMessage("No hospitals found with the given criteria.");
                setShowHospitalsModal(true); // Still open modal to show "No hospitals found"
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("An error occurred. Please ensure the backend server is running and API keys are valid.");
            setShowHospitalsModal(true); // Open modal to show error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src="/aarogyalink_logo.png" alt="AarogyaLink Logo" className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">AarogyaLink</span>
                        <span className="text-xs text-gray-500">Your Healthcare Connection</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-6"> {/* Hidden on small screens */}
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium flex items-center"><IconHome className="mr-1" /> Home</Link>
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium flex items-center"><IconAdmin className="mr-1" /> Admin Panel</Link>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center">
                    <IconSearch className="mr-1" /> Find Healthcare
                </button>
            </nav>

            {/* Main Content Area - Reordered Sections */}
            <main className="flex flex-col flex-1">
                {/* SECTION: Symptom Analysis & Hospital Image (Top Row, Two Columns) */}
                <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50 flex flex-col lg:flex-row gap-8">
                    {/* Left Column: User Input Form */}
                    <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-montserrat">Symptom Analysis</h2>
                        <p className="text-lg text-gray-700 mb-6">Provide detailed information for accurate healthcare recommendations.</p>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Health Details</h3>
                        <form onSubmit={handleSymptomSubmit} className="space-y-6">
                            {/* Symptoms Input */}
                            <div>
                                <label htmlFor="symptoms" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconSymptoms /> Symptoms (comma-separated):
                                </label>
                                <input
                                    type="text"
                                    id="symptoms"
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                    placeholder="e.g., fever, cough, headache"
                                    required
                                />
                            </div>

                            {/* Gender Input */}
                            <div>
                                <label className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconGender /> Gender:
                                </label>
                                <div className="flex space-x-6">
                                    <label className="inline-flex items-center text-base">
                                        <input type="radio" className="form-radio text-blue-600" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center text-base">
                                        <input type="radio" className="form-radio text-blue-600" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                        <span className="ml-2">Female</span>
                                    </label>
                                    <label className="inline-flex items-center text-base">
                                        <input type="radio" className="form-radio text-blue-600" name="gender" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                                        <span className="ml-2">Other</span>
                                    </label>
                                </div>
                            </div>

                            {/* Age Input */}
                            <div>
                                <label htmlFor="age" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconAge /> Age:
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                    placeholder="e.g., 30"
                                    min="0"
                                />
                            </div>

                            {/* Previously Faced Issue? */}
                            <div>
                                <label className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconPreviouslyFaced />
                                    Previously faced this issue?
                                </label>
                                <div className="flex space-x-6">
                                    <label className="inline-flex items-center text-base">
                                        <input type="radio" className="form-radio text-blue-600" name="previouslyFaced" value="yes" checked={previouslyFaced === 'yes'} onChange={(e) => setPreviouslyFaced(e.target.value)} />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center text-base">
                                        <input type="radio" className="form-radio text-blue-600" name="previouslyFaced" value="no" checked={previouslyFaced === 'no'} onChange={(e) => { setPreviouslyFaced(e.target.value); setHowLongAgo(''); }} />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* How long ago? (Conditional) */}
                            {previouslyFaced === 'yes' && (
                                <div>
                                    <label htmlFor="howLongAgo" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                        <IconDuration /> If so, how long ago?
                                    </label>
                                    <input
                                        type="text"
                                        id="howLongAgo"
                                        value={howLongAgo}
                                        onChange={(e) => setHowLongAgo(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                        placeholder="e.g., 3 months, 1 year"
                                    />
                                </div>
                            )}

                            {/* Symptom Duration */}
                            <div>
                                <label htmlFor="symptomDuration" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconDuration /> Symptoms from how many days/weeks?
                                </label>
                                <input
                                    type="text"
                                    id="symptomDuration"
                                    value={symptomDuration}
                                    onChange={(e) => setSymptomDuration(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                    placeholder="e.g., 5 days, 2 weeks"
                                />
                            </div>

                            {/* City Input */}
                            <div>
                                <label htmlFor="city" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconCity /> City:
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                    placeholder="e.g., Hyderabad"
                                    required
                                />
                            </div>

                            {/* Healthcare Scheme Input */}
                            <div>
                                <label htmlFor="scheme" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconScheme /> Healthcare Scheme:
                                </label>
                                <input
                                    type="text"
                                    id="scheme"
                                    value={scheme}
                                    onChange={(e) => setScheme(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                    placeholder="Optional: Arogyasri, PMJAY"
                                />
                            </div>

                            {/* Insurance Partner Input */}
                            <div>
                                <label htmlFor="insurance" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                                    <IconInsurance /> Insurance Partner:
                                </label>
                                <input
                                    type="text"
                                    id="insurance"
                                    value={insurance}
                                    onChange={(e) => setInsurance(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800"
                                    placeholder="Optional: Aetna, Cigna"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Hospital Image Section */}
                    <div className="lg:w-1/2 rounded-xl shadow-xl relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                        {/* Image as direct content, filling the container */}
                        <img
                            src="/web_hospital_logo.jpg"
                            alt="Hospital Building"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/333333?text=Hospital+Image'; }}
                        />
                        
                        {/* Content (Probable Disease, Message, View Hospitals Button) is now overlaid on the image */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white bg-black bg-opacity-50 p-4 rounded-lg">
                            {disease && (
                                <div className="mb-4 p-2 md:p-4 bg-blue-700 rounded-lg w-full text-center text-sm md:text-base">
                                    <h3 className="text-lg md:text-xl font-semibold">Probable Disease: <span className="font-bold">{disease}</span></h3>
                                </div>
                            )}
                            
                            {message && <p className="mb-4 text-red-300 text-sm md:text-lg font-medium text-center">{message}</p>}

                            {/* Button to open the modal */}
                            {hospitals.length > 0 && (
                                <button
                                    onClick={() => setShowHospitalsModal(true)}
                                    className="px-4 py-2 md:px-6 md:py-3 bg-blue-700 text-white text-base md:text-lg font-bold rounded-md shadow-md
                                               hover:bg-blue-800 transition-colors mt-2 md:mt-4"
                                >
                                    View Recommended Hospitals ({hospitals.length})
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* SECTION: How AarogyaLink Works */}
                <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 font-montserrat mb-3">How AarogyaLink Works</h2>
                        <p className="text-lg text-gray-700">Our intelligent platform analyzes your symptoms and connects you with the most suitable healthcare options.</p>
                    </div>
                    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-3">
                                <IconIntelligentAnalysis />
                                <div>
                                    <p className="font-semibold text-xl">Intelligent Analysis</p>
                                    <p className="text-gray-600">AI-powered symptom analysis using advanced medical knowledge.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <IconHospitalMatching />
                                <div>
                                    <p className="font-semibold text-xl">Hospital Matching</p>
                                    <p className="text-gray-600">Find the best hospitals and specialists for your condition.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <IconInsuranceIntegration />
                                <div>
                                    <p className="font-semibold text-xl">Insurance Integration</p>
                                    <p className="text-gray-600">Check coverage with healthcare schemes and insurance partners.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* SECTION: AarogyaLink Analytics (Moved down) */}
                <section className="py-16 px-6 md:px-12 lg:px-20 bg-white border-b border-gray-200">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 font-montserrat mb-3">AarogyaLink Analytics</h2>
                        <p className="text-lg text-gray-700">Our impact and commitment to quality healthcare.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                            <IconPatients />
                            <p className="text-3xl font-bold text-gray-900">10,000+</p>
                            <p className="text-base text-gray-600">Patients Helped</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                            <IconHospitals />
                            <div>
                                <p className="text-3xl font-bold">500+</p>
                                <p className="text-base text-gray-600">Partner Hospitals</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                            <IconSuccess />
                            <div>
                                <p className="text-3xl font-bold">95%</p>
                                <p className="text-base text-gray-600">Success Rate</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                            <IconSecurity />
                            <div>
                                <p className="text-3xl font-bold">100%</p>
                                <p className="text-base text-gray-600">Data Security</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Medical Reports Section */}
                <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50 flex flex-col items-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 font-montserrat mb-8 text-center">Medical Reports (Optional)</h2>
                    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center py-12 cursor-pointer hover:border-blue-500 transition-colors">
                        <label htmlFor="medical-report-upload" className="cursor-pointer flex flex-col items-center">
                            <IconUpload />
                            <p className="mt-4 text-lg text-gray-700">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-500">PDF, JPG, PNG | Max 10MB</p>
                        </label>
                        {/* The actual file input is hidden and triggered by the label */}
                        <input type="file" id="medical-report-upload" className="hidden" />
                    </div>
                    <button
                        type="submit" // This button will trigger the form submission
                        onClick={handleSymptomSubmit}
                        className="mt-12 w-full max-w-md px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-lg shadow-lg
                                   hover:bg-green-600 transition-colors transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-300"
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Find Healthcare Options'}
                    </button>
                </section>
            </main>

            {/* Hospitals Modal - This is where results will ONLY be shown */}
            {showHospitalsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl max-w-xl md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-gray-800">
                        <button
                            onClick={() => setShowHospitalsModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                        >
                            &times; {/* Times symbol for close */}
                        </button>
                        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Analysis Results</h3>
                        
                        {disease && ( // Display probable disease in modal for context
                            <div className="mb-4 p-4 bg-blue-100 rounded-lg w-full text-blue-800">
                                <h4 className="text-xl font-semibold flex items-center">
                                    <IconCheckCircle /> Probable Diagnosis: <span className="font-bold ml-2">{disease}</span>
                                </h4>
                            </div>
                        )}

                        {recommendations.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Recommendations:</h4>
                                <ul className="list-none space-y-2">
                                    {recommendations.map((rec, index) => (
                                        <li key={index} className="flex items-start text-gray-700">
                                            <IconCheckCircle className="mt-1 flex-shrink-0" />
                                            <span className="ml-2">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {message && <p className="mb-4 text-red-600 text-lg font-medium text-center">{message}</p>}

                        {hospitals.length > 0 ? (
                            <div className="mb-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Recommended Hospitals:</h4>
                                <ul className="space-y-4">
                                    {hospitals.map(h => (
                                        <li key={h.id} className="bg-gray-100 p-5 rounded-lg shadow-sm border border-gray-200">
                                            <h4 className="text-xl font-bold text-blue-700 mb-1">{h.name}</h4>
                                            <p className="text-gray-700 text-sm mb-0.5"><strong>Address:</strong> {h.address}</p>
                                            <p className="text-gray-700 text-sm mb-0.5"><strong>Diseases:</strong> {h.diseasesTreated.join(', ')}</p>
                                            <p className="text-gray-700 text-sm mb-0.5"><strong>Schemes:</strong> {h.schemesAccepted.join(', ')}</p>
                                            <p className="text-gray-700 text-sm"><strong>Insurance:</strong> {h.insurancePartners.join(', ')}</p>
                                            <div className="flex justify-end space-x-2 mt-3">
                                                {/* Mock Phone and Directions - replace with actual links/logic */}
                                                <button className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                                                    <IconPhone /> Call Now
                                                </button>
                                                <button className="flex items-center px-3 py-1 bg-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-400 transition-colors">
                                                    <IconDirections /> Get Directions
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            // Display message if no hospitals found, when modal is open
                            !loading && !message && <p className="text-center text-gray-600 text-base md:text-lg">No hospitals found with the given criteria.</p>
                        )}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setShowHospitalsModal(false)}
                                className="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-md shadow-md
                                           hover:bg-green-700 transition-colors"
                            >
                                Post Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;

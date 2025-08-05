    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios'; // Import axios for API calls

    function HomePage() {
        // State for the User Input section, now managed directly in HomePage
        const [symptoms, setSymptoms] = useState('');
        const [city, setCity] = useState('');
        const [scheme, setScheme] = useState('');
        const [insurance, setInsurance] = useState('');
        const [hospitals, setHospitals] = useState([]);
        const [disease, setDisease] = useState('');
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');

        // Function to handle symptom submission, moved from UserPage
        const handleSymptomSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setHospitals([]);
            setDisease('');
            setMessage('');

            try {
                // Step 1: Analyze symptoms
                const symptomResponse = await axios.post('https://aarogyalink.onrender.com/api/analyzeSymptoms', { symptoms });
                const probableDisease = symptomResponse.data.disease;
                setDisease(probableDisease);
                
                // Step 2: Fetch hospitals based on disease, city, scheme, and insurance
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
                } else {
                    setMessage("No hospitals found with the given criteria.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("An error occurred. Please ensure the backend server is running and data is available.");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
                {/* Top Section: Banner, Logo, Login/Register */}
                <header className="relative w-full bg-orange-300 h-40 flex items-center justify-end p-4 shadow-md">
                    <div className="absolute left-4 -bottom-10 w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    {/* Actual Logo image */}
                    <img 
                        src="/aarogyalink_logo.png" // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR IMAGE
                        alt="AarogyaLink Logo" 
                        className="w-full h-full object-cover rounded-full" 
                        // Fallback in case image doesn't load (optional, but good practice)
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/cccccc/333333?text=Logo'; }}
                    />
                </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-extrabold text-gray-800 font-montserrat leading-tight drop-shadow-lg">
                        AarogyaLink 
                    </h1>
                    <p className="text-2xl text-gray-700 mt-2 font-montserrat font-semibold">
                        Where Bharat finds Care
                    </p>
                </div>
                    <div className="flex flex-col space-y-2">
                        <Link
                            to="/login" // Assuming a future login page
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
                        >
                            LOGIN
                        </Link>
                        <Link
                            to="/register" // Assuming a future register page
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
                        >
                            REGISTER
                        </Link>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex flex-1 p-6 gap-6 pt-16"> {/* Added pt-16 to account for overlapping logo */}
                    {/* Left Sidebar/Column */}
                    <aside className="w-1/5 flex flex-col space-y-4">
                        <Link
                            to="/schemes" // Assuming a future schemes page
                            className="w-full py-4 bg-blue-500 text-white rounded-full text-center text-lg font-semibold shadow-md hover:bg-blue-600 transition-colors"
                        >
                            SCHEMES
                        </Link>
                        <Link
                            to="/insurance-policy" // Assuming a future insurance policy page
                            className="w-full py-4 bg-blue-500 text-white rounded-full text-center text-lg font-semibold shadow-md hover:bg-blue-600 transition-colors"
                        >
                            INSURANCE POLICY
                        </Link>
                        {/* Navigation to original pages, adjusted for new layout */}
                        <Link
                            to="/admin"
                            className="w-full py-3 mt-8 bg-gray-700 text-white rounded-md text-center text-md font-semibold shadow-md hover:bg-gray-800 transition-colors"
                        >
                            Hospital Admin Page
                        </Link>
                    </aside>

                    {/* Central Content: User Input & Hospital Results */}
                    <section className="flex-1 grid grid-cols-2 gap-6 ">
                        {/* USER INPUT Section - Integrated UserPage Form */}
                        <div className="bg-blue-600 p-6 rounded-lg shadow-xl flex flex-col items-center justify-start text-white text-2xl font-bold overflow-auto">
                            <h2 className="text-3xl font-bold mb-6">User Input</h2>
                            <form onSubmit={handleSymptomSubmit} className="space-y-4 text-left w-full max-w-md">
                                <div className="flex flex-col">
                                    <label htmlFor="symptoms" className="text-lg font-medium mb-1">Symptoms (comma-separated):</label>
                                    <input
                                        type="text"
                                        id="symptoms"
                                        value={symptoms}
                                        onChange={(e) => setSymptoms(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                        placeholder="e.g., fever, cough"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="city" className="text-lg font-medium mb-1">City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                        placeholder="e.g., Hyderabad"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="scheme" className="text-lg font-medium mb-1">Healthcare Scheme:</label>
                                    <input
                                        type="text"
                                        id="scheme"
                                        value={scheme}
                                        onChange={(e) => setScheme(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                        placeholder="Optional: Arogyasri, PMJAY"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="insurance" className="text-lg font-medium mb-1">Insurance Partner:</label>
                                    <input
                                        type="text"
                                        id="insurance"
                                        value={insurance}
                                        onChange={(e) => setInsurance(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                        placeholder="Optional: Aetna, Cigna"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="report" className="text-lg font-medium mb-1">Upload Report (mock):</label>
                                    <input type="file" id="report" className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 cursor-pointer" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-green-500 text-white text-xl font-bold rounded-md shadow-md
                                               hover:bg-green-600 transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? 'Analyzing...' : 'Analyze & Find Hospitals'}
                                </button>
                            </form>
                        </div>

                        {/* HOSPITAL Section - Integrated Hospital Results */}
                        <div className="bg-blue-600 p-6 rounded-lg shadow-xl flex flex-col items-center justify-start text-white text-2xl font-bold overflow-auto">
                            <h2 className="text-3xl font-bold mb-6">Hospital Results</h2>
                            {disease && (
                                <div className="mb-4 p-4 bg-blue-700 rounded-lg w-full text-center">
                                    <h3 className="text-xl font-semibold">Probable Disease: <span className="font-bold">{disease}</span></h3>
                                </div>
                            )}
                            
                            {message && <p className="mb-4 text-red-300 text-lg font-medium">{message}</p>}

                            {hospitals.length > 0 && (
                                <div className="w-full space-y-4">
                                    <h3 className="text-xl font-semibold text-center">Recommended Hospitals:</h3>
                                    <ul className="space-y-3">
                                        {hospitals.map(h => (
                                            <li key={h.id} className="bg-blue-700 p-4 rounded-lg shadow-md text-sm">
                                                <h4 className="text-lg font-bold text-white mb-1">{h.name}</h4>
                                                <p className="text-blue-100"><strong>Address:</strong> {h.address}</p>
                                                <p className="text-blue-100"><strong>Diseases:</strong> {h.diseasesTreated.join(', ')}</p>
                                                <p className="text-blue-100"><strong>Schemes:</strong> {h.schemesAccepted.join(', ')}</p>
                                                <p className="text-blue-100"><strong>Insurance:</strong> {h.insurancePartners.join(', ')}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Bottom Section: Specialists */}
                <footer className="w-full bg-gray-800 p-6 flex justify-center flex-wrap gap-4 shadow-inner mt-6">
                    {['SPECIALIST1', 'SPECIALIST2', 'SPECIALIST3', 'SPECIALIST4', 'SPECIALIST5', 'SPECIALIST6'].map((specialist, index) => (
                        <div
                            key={index}
                            className="px-6 py-3 bg-blue-700 text-white rounded-md text-center font-semibold shadow-md hover:bg-blue-800 transition-colors"
                        >
                            {specialist}
                        </div>
                    ))}
                </footer>
            </div>
        );
    }

    export default HomePage;
    
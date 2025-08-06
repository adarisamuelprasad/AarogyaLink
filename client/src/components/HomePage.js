import React, { useState } from 'react';
import axios from 'axios';

// Import all your child components
import Navbar from './Navbar';
import SymptomForm from './SymptomForm';
import HowItWorks from './HowItWorks';
import AnalyticsSection from './AnalyticsSection';
import ReportUpload from './ReportUpload';
import HospitalsModal from './HospitalsModal';

function HomePage() {
    const [formData, setFormData] = useState({
        symptoms: '', gender: '', age: '', previouslyFaced: '',
        howLongAgo: '', symptomDuration: '', city: '', scheme: '', insurance: ''
    });

    const [hospitals, setHospitals] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showHospitalsModal, setShowHospitalsModal] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const handleSymptomSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setHospitals([]);
        setDiagnoses([]);
        setMessage('');
        setRecommendations([]);
        setShowHospitalsModal(false);

        const payload = {
            ...formData,
            age: parseInt(formData.age, 10) || 0,
            howLongAgo: formData.previouslyFaced === 'yes' ? formData.howLongAgo : '',
        };

        try {
            // --- FIX: Hardcoding the local server URL directly ---
            const apiBaseUrl = 'http://localhost:5000'; 
            
            const symptomResponse = await axios.post(`${apiBaseUrl}/api/analyzeSymptoms`, payload);
            
            const newDiagnoses = symptomResponse.data.diagnoses;
            if (!newDiagnoses || newDiagnoses.length === 0) {
                throw new Error("AI did not return a valid diagnosis.");
            }
            setDiagnoses(newDiagnoses);
            
            const topDiagnosis = newDiagnoses[0].diagnosis;

            // Generate recommendations based on the top diagnosis
            let mockRecs = [];
            if (topDiagnosis.toLowerCase().includes('menstrual')) {
                mockRecs = ["Consider pain management options", "Track your cycle"];
            } else if (topDiagnosis.toLowerCase().includes('cardiac')) {
                mockRecs = ["Consult a cardiologist immediately", "Avoid strenuous activities"];
            } else {
                mockRecs = ["Consult a general physician", "Follow up if symptoms worsen"];
            }
            setRecommendations(mockRecs);

            const hospitalResponse = await axios.get(`${apiBaseUrl}/api/hospitals`, {
                params: {
                    disease: topDiagnosis,
                    city: formData.city,
                }
            });
            
            if (hospitalResponse.data.length > 0) {
                setHospitals(hospitalResponse.data);
            } else {
                setMessage("No hospitals found with the given criteria.");
            }
            setShowHospitalsModal(true);

        } catch (error) {
            console.error("Error during API call:", error);
            setMessage("An error occurred. Please check the console for details.");
            setShowHospitalsModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Navbar />
            <main className="flex flex-col flex-1">
                <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50 flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 flex flex-col gap-8">
                        <SymptomForm
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSymptomSubmit}
                        />
                        <ReportUpload
                            onSubmit={handleSymptomSubmit}
                            loading={loading}
                        />
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-8">
                        <HowItWorks />
                        <AnalyticsSection />
                    </div>
                </section>
            </main>
            <HospitalsModal
                show={showHospitalsModal}
                onClose={() => setShowHospitalsModal(false)}
                diagnoses={diagnoses}
                recommendations={recommendations}
                message={message}
                hospitals={hospitals}
                loading={loading}
            />
        </div>
    );
}

export default HomePage;
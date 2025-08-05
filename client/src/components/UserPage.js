import React, { useState } from 'react';
import axios from 'axios';

function UserPage() {
    const [symptoms, setSymptoms] = useState('');
    const [city, setCity] = useState('');
    const [scheme, setScheme] = useState('');
    const [insurance, setInsurance] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [disease, setDisease] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>User Page</h1>
            <form onSubmit={handleSymptomSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Symptoms (comma-separated):</label>
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Healthcare Scheme (e.g., Arogyasri, PMJAY):</label>
                    <input
                        type="text"
                        value={scheme}
                        onChange={(e) => setScheme(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Insurance Partner (e.g., Aetna, Cigna):</label>
                    <input
                        type="text"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Upload Report (mock):</label>
                    <input type="file" style={styles.fileInput} />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze & Find Hospitals'}
                </button>
            </form>

            {disease && (
                <div style={styles.resultsContainer}>
                    <h3 style={styles.resultTitle}>Probable Disease: {disease}</h3>
                </div>
            )}
            
            {message && <p style={styles.message}>{message}</p>}

            {hospitals.length > 0 && (
                <div style={styles.resultsContainer}>
                    <h3 style={styles.resultTitle}>Recommended Hospitals:</h3>
                    <ul style={styles.hospitalList}>
                        {hospitals.map(h => (
                            <li key={h.id} style={styles.hospitalItem}>
                                <h4>{h.name}</h4>
                                <p><strong>Address:</strong> {h.address}</p>
                                <p><strong>Diseases Treated:</strong> {h.diseasesTreated.join(', ')}</p>
                                <p><strong>Schemes Accepted:</strong> {h.schemesAccepted.join(', ')}</p>
                                <p><strong>Insurance Partners:</strong> {h.insurancePartners.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        textAlign: 'center',
        color: '#2980b9'
    },
    form: {
        backgroundColor: '#f4f6f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    fileInput: {
        display: 'block',
        marginTop: '5px'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em'
    },
    resultsContainer: {
        marginTop: '30px',
        borderTop: '2px solid #ecf0f1',
        paddingTop: '20px'
    },
    resultTitle: {
        color: '#34495e'
    },
    hospitalList: {
        listStyle: 'none',
        padding: '0'
    },
    hospitalItem: {
        backgroundColor: '#ecf0f1',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '10px'
    },
    message: {
        color: 'red',
        textAlign: 'center'
    }
};

export default UserPage;
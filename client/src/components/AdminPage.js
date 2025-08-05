import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
    const [hospitals, setHospitals] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        diseasesTreated: '',
        schemesAccepted: '',
        insurancePartners: ''
    });
    const [message, setMessage] = useState('');

    const fetchHospitals = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/allHospitals');
            setHospitals(response.data);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            setMessage("Failed to fetch hospital data.");
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const newHospital = {
                ...formData,
                diseasesTreated: formData.diseasesTreated.split(',').map(s => s.trim()),
                schemesAccepted: formData.schemesAccepted.split(',').map(s => s.trim()),
                insurancePartners: formData.insurancePartners.split(',').map(s => s.trim())
            };
            
            await axios.post('http://localhost:5000/api/addHospital', newHospital);
            setMessage("Hospital added successfully!");
            setFormData({
                name: '', address: '', city: '', diseasesTreated: '', schemesAccepted: '', insurancePartners: ''
            });
            fetchHospitals(); // Refresh the list
        } catch (error) {
            console.error("Error adding hospital:", error);
            setMessage("Failed to add hospital.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Hospital Admin Page</h1>

            <div style={styles.formContainer}>
                <h2 style={styles.subHeader}>Add New Hospital</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label>Hospital Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>City:</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Diseases Treated (comma-separated):</label>
                        <input type="text" name="diseasesTreated" value={formData.diseasesTreated} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Schemes Accepted (comma-separated):</label>
                        <input type="text" name="schemesAccepted" value={formData.schemesAccepted} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Insurance Partners (comma-separated):</label>
                        <input type="text" name="insurancePartners" value={formData.insurancePartners} onChange={handleChange} required style={styles.input} />
                    </div>
                    <button type="submit" style={styles.button}>Add Hospital</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>

            <div style={styles.tableContainer}>
                <h2 style={styles.subHeader}>Existing Hospitals</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Name</th>
                            <th style={styles.tableHeader}>Address</th>
                            <th style={styles.tableHeader}>Diseases Treated</th>
                            <th style={styles.tableHeader}>Schemes</th>
                            <th style={styles.tableHeader}>Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map(h => (
                            <tr key={h.id}>
                                <td style={styles.tableCell}>{h.name}</td>
                                <td style={styles.tableCell}>{h.address}</td>
                                <td style={styles.tableCell}>{h.diseasesTreated.join(', ')}</td>
                                <td style={styles.tableCell}>{h.schemesAccepted.join(', ')}</td>
                                <td style={styles.tableCell}>{h.insurancePartners.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        textAlign: 'center',
        color: '#2980b9'
    },
    subHeader: {
        color: '#34495e',
        borderBottom: '2px solid #ecf0f1',
        paddingBottom: '10px'
    },
    formContainer: {
        backgroundColor: '#f4f6f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '12px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em'
    },
    tableContainer: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    tableHeader: {
        backgroundColor: '#34495e',
        color: 'white',
        padding: '10px',
        textAlign: 'left'
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd'
    },
    message: {
        color: 'green',
        textAlign: 'center',
        marginTop: '10px'
    }
};

export default AdminPage;
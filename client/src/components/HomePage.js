import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to AarogyaLink</h1>
            <p style={styles.description}>
                Your one-stop solution for linking healthcare schemes, hospital data, and insurance.
                Easily find the right hospital for your needs.
            </p>
            <div style={styles.buttonGroup}>
                <Link to="/user" style={styles.button}>
                    User Page
                </Link>
                <Link to="/admin" style={styles.button}>
                    Hospital Admin Page
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        color: '#2c3e50',
        fontSize: '2.5em'
    },
    description: {
        color: '#7f8c8d',
        fontSize: '1.2em',
        margin: '20px 0'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
    },
    button: {
        textDecoration: 'none',
        padding: '15px 30px',
        backgroundColor: '#3498db',
        color: 'white',
        borderRadius: '5px',
        fontSize: '1.1em',
        transition: 'background-color 0.3s'
    }
};

export default HomePage;
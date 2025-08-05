import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
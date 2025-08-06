import React from 'react';
import { IconCheckCircle, IconPhone, IconDirections } from './Icons';

// --- A small component to display star ratings ---
const StarRating = ({ rating, totalRatings }) => {
    if (!rating) return <span className="text-sm text-gray-500">No rating available</span>;
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5; // This logic is simplified for demonstration
    const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="text-yellow-500 text-lg">★</span>)}
            {halfStar && <span className="text-yellow-500 text-lg">★</span>}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-gray-300 text-lg">★</span>)}
            <span className="ml-2 text-xs text-gray-600">({totalRatings} ratings)</span>
        </div>
    );
};

function HospitalsModal({ show, onClose, diagnoses, recommendations, message, hospitals, loading }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-xl md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-gray-800">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                >
                    &times;
                </button>
                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Analysis Results</h3>

                {diagnoses && diagnoses.length > 0 && (
                    <div className="mb-4 p-4 bg-blue-100 rounded-lg w-full text-blue-800 space-y-3">
                        <h4 className="text-xl font-semibold">Possible Conditions:</h4>
                        {diagnoses.map((item, index) => (
                            <div key={index}>
                                <p className="font-bold flex items-center">
                                    <IconCheckCircle /> {index + 1}. {item.diagnosis}
                                </p>
                                <p className="text-sm text-blue-700 pl-7">{item.reason}</p>
                            </div>
                        ))}
                    </div>
                )}

                {recommendations && recommendations.length > 0 && (
                     <div className="mb-6">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">Recommendations:</h4>
                        <ul className="list-none space-y-2">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <IconCheckCircle className="mt-1" />
                                    <span className="ml-2">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {message && <p className="mb-4 text-red-600 text-lg font-medium text-center">{message}</p>}

                {hospitals && hospitals.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Recommended Hospitals</h4>
                        <ul className="space-y-4">
                            {hospitals.map(h => (
                                <li key={h.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-blue-700 pr-4">{h.name}</h4>
                                        <div className="text-right flex-shrink-0">
                                            <div className="font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs">
                                                Relevance: {h.relevanceScore}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-2">
                                        <StarRating rating={h.rating} totalRatings={h.user_ratings_total} />
                                        {h.isOpen === true && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Open Now</span>}
                                        {h.isOpen === false && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">Closed</span>}
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3">{h.address}</p>
                                    
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        {h.phone && (
                                            <a href={`tel:${h.phone}`} className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                                <IconPhone /> Call Now
                                            </a>
                                        )}
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name)}&query_place_id=${h.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                                            <IconDirections /> Get Directions
                                        </a>
                                        {h.website && (
                                            <a href={h.website} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-md shadow-md hover:bg-green-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HospitalsModal;
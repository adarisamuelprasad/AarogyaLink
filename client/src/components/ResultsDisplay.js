import React from 'react';

function ResultsDisplay({ disease, message, hospitals, onViewHospitalsClick }) {
    return (
        <div className="lg:w-1/2 rounded-xl shadow-xl relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[400px]">
            <img
                src="/web_hospital_logo.jpg"
                alt="Hospital Building"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/333333?text=Hospital+Image'; }}
            />
            
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white bg-black bg-opacity-50 p-4 rounded-lg">
                {disease && (
                    <div className="mb-4 p-2 md:p-4 bg-blue-700 rounded-lg w-full text-center text-sm md:text-base">
                        <h3 className="text-lg md:text-xl font-semibold">Probable Disease: <span className="font-bold">{disease}</span></h3>
                    </div>
                )}
                
                {message && <p className="mb-4 text-red-300 text-sm md:text-lg font-medium text-center">{message}</p>}

                {hospitals.length > 0 && (
                    <button
                        onClick={onViewHospitalsClick}
                        className="px-4 py-2 md:px-6 md:py-3 bg-blue-700 text-white text-base md:text-lg font-bold rounded-md shadow-md hover:bg-blue-800 transition-colors mt-2 md:mt-4"
                    >
                        View Recommended Hospitals ({hospitals.length})
                    </button>
                )}
            </div>
        </div>
    );
}

export default ResultsDisplay;
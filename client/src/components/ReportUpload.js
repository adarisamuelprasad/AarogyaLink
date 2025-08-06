import React from 'react';
import { IconUpload } from './Icons';

function ReportUpload({ onSubmit, loading }) {
    return (
        // Padding reduced from p-8 to p-6 for a tighter feel
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-montserrat">
                Medical Reports (Optional)
            </h3>
            {/* Vertical padding reduced from py-12 to py-6 */}
            <div className="w-full bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center py-6 hover:border-blue-500 transition-colors">
                <label htmlFor="medical-report-upload" className="cursor-pointer flex flex-col items-center">
                    <IconUpload />
                    {/* Text size reduced from text-lg to text-base */}
                    <p className="mt-3 text-base text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG | Max 10MB</p>
                </label>
                <input type="file" id="medical-report-upload" className="hidden" />
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                // Top margin reduced from mt-8 to mt-6
                className="mt-6 w-full px-8 py-3 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg
                           hover:bg-green-600 transition-colors transform hover:-translate-y-1 
                           focus:outline-none focus:ring-4 focus:ring-green-300"
                disabled={loading}
            >
                {loading ? 'Analyzing...' : 'Find Healthcare Options'}
            </button>
        </div>
    );
}

export default ReportUpload;
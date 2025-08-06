import React from 'react';
import { IconSymptoms, IconGender, IconAge, IconPreviouslyFaced, IconDuration, IconCity, IconScheme, IconInsurance } from './Icons';

function SymptomForm({
    formData,
    setFormData,
    handleSubmit
}) {
    const { symptoms, gender, age, previouslyFaced, howLongAgo, symptomDuration, city, scheme, insurance } = formData;

    const handleChange = (e) => {
        const { id, value, name, type } = e.target;
        if (type === 'radio') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    return (
        // --- FIX IS HERE: The "lg:w-1/2" class has been removed ---
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-montserrat">Symptom Analysis</h2>
            <p className="text-lg text-gray-700 mb-6">Provide detailed information for accurate healthcare recommendations.</p>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Health Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... rest of the form code is unchanged ... */}
                <div>
                    <label htmlFor="symptoms" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconSymptoms /> Symptoms (comma-separated):
                    </label>
                    <input type="text" id="symptoms" value={symptoms} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800" placeholder="e.g., fever, cough, headache" required />
                </div>

                <div>
                    <label className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconGender /> Gender:
                    </label>
                    <div className="flex space-x-6">
                        <label className="inline-flex items-center text-base">
                            <input type="radio" className="form-radio text-blue-600" name="gender" value="male" checked={gender === 'male'} onChange={handleChange} />
                            <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center text-base">
                            <input type="radio" className="form-radio text-blue-600" name="gender" value="female" checked={gender === 'female'} onChange={handleChange} />
                            <span className="ml-2">Female</span>
                        </label>
                        <label className="inline-flex items-center text-base">
                            <input type="radio" className="form-radio text-blue-600" name="gender" value="other" checked={gender === 'other'} onChange={handleChange} />
                            <span className="ml-2">Other</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="age" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconAge /> Age:
                    </label>
                    <input type="number" id="age" value={age} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., 30" min="0" />
                </div>

                <div>
                    <label className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconPreviouslyFaced /> Previously faced this issue?
                    </label>
                    <div className="flex space-x-6">
                        <label className="inline-flex items-center text-base">
                            <input type="radio" className="form-radio text-blue-600" name="previouslyFaced" value="yes" checked={previouslyFaced === 'yes'} onChange={handleChange} />
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center text-base">
                            <input type="radio" className="form-radio text-blue-600" name="previouslyFaced" value="no" checked={previouslyFaced === 'no'} onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, howLongAgo: '' })) }} />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>

                {previouslyFaced === 'yes' && (
                    <div>
                        <label htmlFor="howLongAgo" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                            <IconDuration /> If so, how long ago?
                        </label>
                        <input type="text" id="howLongAgo" value={howLongAgo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., 3 months, 1 year" />
                    </div>
                )}
                
                <div>
                    <label htmlFor="symptomDuration" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconDuration /> Symptoms from how many days/weeks?
                    </label>
                    <input type="text" id="symptomDuration" value={symptomDuration} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., 5 days, 2 weeks" />
                </div>

                 <div>
                    <label htmlFor="city" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconCity /> City:
                    </label>
                    <input type="text" id="city" value={city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., Hyderabad" required />
                </div>
                
                <div>
                    <label htmlFor="scheme" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconScheme /> Healthcare Scheme:
                    </label>
                    <input type="text" id="scheme" value={scheme} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Optional: Arogyasri, PMJAY" />
                </div>
                
                <div>
                    <label htmlFor="insurance" className="block text-gray-700 text-lg font-medium mb-2 flex items-center">
                        <IconInsurance /> Insurance Partner:
                    </label>
                    <input type="text" id="insurance" value={insurance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Optional: Aetna, Cigna" />
                </div>
            </form>
        </div>
    );
}

export default SymptomForm;
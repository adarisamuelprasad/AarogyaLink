import React from 'react';
import { IconPatients, IconHospitals, IconSuccess, IconSecurity } from './Icons';

function AnalyticsSection() {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-20 bg-white border-b border-gray-200">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 font-montserrat mb-3">AarogyaLink Analytics</h2>
                <p className="text-lg text-gray-700">Our impact and commitment to quality healthcare.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                    <IconPatients />
                    <p className="text-3xl font-bold text-gray-900">10,000+</p>
                    <p className="text-base text-gray-600">Patients Helped</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                    <IconHospitals />
                    <p className="text-3xl font-bold">500+</p>
                    <p className="text-base text-gray-600">Partner Hospitals</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                    <IconSuccess />
                    <p className="text-3xl font-bold">95%</p>
                    <p className="text-base text-gray-600">Success Rate</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 shadow-sm">
                    <IconSecurity />
                    <p className="text-3xl font-bold">100%</p>
                    <p className="text-base text-gray-600">Data Security</p>
                </div>
            </div>
        </section>
    );
}

export default AnalyticsSection;
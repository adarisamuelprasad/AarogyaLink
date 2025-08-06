import React from 'react';
import { IconIntelligentAnalysis, IconHospitalMatching, IconInsuranceIntegration } from './Icons';

function HowItWorks() {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 font-montserrat mb-3">How AarogyaLink Works</h2>
                <p className="text-lg text-gray-700">Our intelligent platform analyzes your symptoms and connects you with the most suitable healthcare options.</p>
            </div>
            <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <ul className="space-y-6">
                    <li className="flex items-start space-x-3">
                        <IconIntelligentAnalysis />
                        <div>
                            <p className="font-semibold text-xl">Intelligent Analysis</p>
                            <p className="text-gray-600">AI-powered symptom analysis using advanced medical knowledge.</p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-3">
                        <IconHospitalMatching />
                        <div>
                            <p className="font-semibold text-xl">Hospital Matching</p>
                            <p className="text-gray-600">Find the best hospitals and specialists for your condition.</p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-3">
                        <IconInsuranceIntegration />
                        <div>
                            <p className="font-semibold text-xl">Insurance Integration</p>
                            <p className="text-gray-600">Check coverage with healthcare schemes and insurance partners.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default HowItWorks;
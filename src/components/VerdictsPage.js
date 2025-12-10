import React from 'react';
import { Award, DollarSign, Shield } from 'lucide-react';
import IntakeForm from './IntakeForm';

const VerdictsPage = ({ t }) => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-[#111] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Award className="w-16 h-16 text-red-600 mx-auto mb-6" />
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight uppercase tracking-tight">
                        Our <span className="text-red-600">Verdicts</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We don't just promise results; we deliver them. See our track record of securing justice for our clients.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-2">Coming Soon</h3>
                    <p className="text-gray-500">We are currently compiling our latest case results. Check back shortly.</p>
                </div>
            </div>
        </div>
    );
};

export default VerdictsPage;

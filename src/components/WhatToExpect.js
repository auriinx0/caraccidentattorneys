import React from 'react';

const WhatToExpect = ({ t }) => {
    if (!t.process) return null;

    const steps = [
        {
            id: 1,
            title: t.process.step1,
            desc: t.process.step1Desc,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
            )
        },
        {
            id: 2,
            title: t.process.step2,
            desc: t.process.step2Desc,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            )
        },
        {
            id: 3,
            title: t.process.step3,
            desc: t.process.step3Desc,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
                        {t.process.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t.process.subtitle}
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" style={{ top: '60px' }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                        {steps.map((step) => (
                            <div key={step.id} className="group bg-white md:bg-transparent p-8 md:p-0 rounded-xl shadow-lg md:shadow-none hover:-translate-y-1 transition-transform duration-300">
                                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white rounded-full border-4 border-red-50 shadow-sm mb-6 mx-auto group-hover:border-red-100 group-hover:bg-red-50 transition-colors duration-300">
                                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                                        {step.id}
                                    </span>
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed px-4">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Arrow indicators (Visualizing flow down) */}
                <div className="md:hidden flex justify-center mt-[-30px] mb-[-30px] z-20 relative opacity-20">
                    {/* Not explicitly adding vertical arrows between cards to keep it clean, the logical scroll flow is enough */}
                </div>

            </div>
        </section>
    );
};

export default WhatToExpect;

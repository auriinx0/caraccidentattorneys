import React from 'react';
import { CATEGORY_STRUCT } from '../constants';

const MainCategories = ({ t, setRoute }) => (
    <section className="py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 border-b border-gray-800 pb-8">
                <div>
                    <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Legal Expertise</h2>
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t.sections.areasTitle}</h3>
                </div>
                <p className="text-gray-400 max-w-md mt-4 md:mt-0">{t.sections.areasSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-800">
                {CATEGORY_STRUCT.map((cat) => {
                    const info = t.categories[cat.id] || { title: 'Unknown', desc: '...' };

                    return (
                        <div
                            key={cat.id}
                            onClick={() => setRoute(`category-${cat.id}`)}
                            className="group bg-[#1f1f1f] p-10 md:p-14 border border-gray-800 hover:bg-[#252525] hover:border-red-900 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center text-center h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="mb-8 relative z-10 p-6 bg-[#151515] rounded-full group-hover:bg-red-900/20 transition-colors">
                                <cat.icon size={48} strokeWidth={1} className="text-white group-hover:text-red-500 transition-colors duration-300" />
                            </div>

                            <h4 className="relative z-10 font-serif text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors uppercase">
                                {info.title}
                            </h4>

                            <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-8">
                                {info.desc}
                            </p>

                            <span className="relative z-10 text-red-600 text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-red-600 pb-1 transition-all">
                                {t.sections.viewAll}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

export default MainCategories;

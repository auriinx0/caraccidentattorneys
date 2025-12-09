import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { CATEGORY_STRUCT, AREA_STRUCT } from '../constants';
import IntakeForm from './IntakeForm';

const CategoryPage = ({ catId, t, setRoute }) => {
    const categoryStruct = CATEGORY_STRUCT.find(c => c.id === catId);
    if (!categoryStruct) return null;
    const catInfo = t.categories[catId];
    const relevantAreas = AREA_STRUCT.filter(a => a.categoryId === catId).map(area => ({ ...area, ...t.areas[area.id] }));

    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-20">
            <div className="bg-[#111] py-16 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button onClick={() => setRoute('home')} className="text-gray-400 hover:text-white mb-6 flex items-center text-xs font-bold uppercase tracking-widest hover:text-red-500 transition">
                        <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> {t.nav.home}
                    </button>
                    <div className="flex items-center space-x-4 mb-4">
                        <categoryStruct.icon className="text-red-600 h-10 w-10" />
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white uppercase">{catInfo.title}</h1>
                    </div>
                    <p className="text-gray-400 max-w-2xl text-lg">{catInfo.desc}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relevantAreas.map((area) => (
                        <div
                            key={area.id}
                            onClick={() => setRoute(`detail-${area.id}`)}
                            className="bg-[#222] p-8 hover:bg-[#2a2a2a] transition cursor-pointer border-l-4 border-transparent hover:border-red-600 group"
                        >
                            <area.icon className="text-gray-400 group-hover:text-white h-8 w-8 mb-4 transition" />
                            <h3 className="text-xl font-bold text-white mb-2 font-serif">{area.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{area.desc}</p>
                            <div className="flex items-center text-red-600 text-xs font-bold uppercase tracking-wider">
                                {t.sections.learnMore} <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white py-16">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 font-serif">{t.form.title}</h2>
                        <p className="text-gray-600">{t.form.subtitle}</p>
                    </div>
                    <IntakeForm t={t} />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;

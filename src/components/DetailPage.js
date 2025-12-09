import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { AREA_STRUCT } from '../constants';
import IntakeForm from './IntakeForm';

const DetailPage = ({ areaId, t, setRoute }) => {
    const areaStruct = AREA_STRUCT.find(a => a.id === areaId);
    const [statIndex, setStatIndex] = useState(0);
    const [fade, setFade] = useState(true);

    // Rotate statistics
    useEffect(() => {
        if (!areaStruct) return;
        const areaInfo = t.areas[areaId];
        if (!areaInfo.statistics || !Array.isArray(areaInfo.statistics)) return;

        const interval = setInterval(() => {
            setFade(false); // Fade out
            setTimeout(() => {
                setStatIndex((prevIndex) => (prevIndex + 1) % areaInfo.statistics.length);
                setFade(true); // Fade in
            }, 500); // Wait for fade out
        }, 4000); // Total display time

        return () => clearInterval(interval);
    }, [areaId, t.areas, areaStruct]);

    if (!areaStruct) return null;
    const areaInfo = t.areas[areaId];

    return (
        <div className="bg-white min-h-screen pt-20">
            <div className="bg-[#1a1a1a] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button onClick={() => setRoute(`category-${areaStruct.categoryId}`)} className="text-gray-400 hover:text-white mb-6 flex items-center text-xs font-bold uppercase tracking-widest hover:text-red-500 transition">
                        <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> {t.nav.practiceAreas}
                    </button>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{areaInfo.title}</h1>
                    <div className="h-1 w-24 bg-red-600"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="prose prose-lg text-gray-700">
                            <p className="text-xl leading-relaxed font-serif text-gray-900">
                                {t.detailPage.introPart1} <strong>{areaInfo.title}</strong> {t.detailPage.introPart2}
                            </p>

                            {/* About Section */}
                            {areaInfo.about && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.aboutTitle}</h3>
                                    <div className="whitespace-pre-line">{areaInfo.about}</div>
                                </>
                            )}

                            {/* Statistics Section */}
                            {areaInfo.statistics && (
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                                    <h3 className="text-xl font-bold text-red-700 mb-4 uppercase tracking-wide flex items-center">
                                        Key Statistics
                                    </h3>
                                    <div className={`min-h-[60px] transition-opacity duration-500 flex items-center ${fade ? 'opacity-100' : 'opacity-0'}`}>
                                        <p className="text-lg font-medium text-gray-800">
                                            {Array.isArray(areaInfo.statistics)
                                                ? areaInfo.statistics[statIndex]
                                                : areaInfo.statistics}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* What To Do Section */}
                            {areaInfo.whatToDo && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.whatToDoTitle}</h3>
                                    {Array.isArray(areaInfo.whatToDo) ? (
                                        <ul className="list-none space-y-3 mb-8">
                                            {areaInfo.whatToDo.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">{i + 1}</span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="whitespace-pre-line mb-8">{areaInfo.whatToDo}</div>
                                    )}
                                </>
                            )}

                            {/* Additional Sections (e.g. Rear Ending) */}
                            {areaInfo.additionalSections && areaInfo.additionalSections.map((section, idx) => (
                                <div key={idx} className="mt-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{section.title}</h3>
                                    <div className="whitespace-pre-line text-gray-700">{section.content}</div>
                                </div>
                            ))}

                            <div className="bg-gray-100 p-8 border-l-4 border-red-700 my-8">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">{t.detailPage.commitTitle}</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {t.detailPage.commitments.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-800 text-sm font-semibold">
                                            <CheckCircle className="h-4 w-4 text-red-600 mr-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* How We Help Section */}
                            {areaInfo.howWeHelp && (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.howWeHelpTitle}</h3>
                                    <div className="whitespace-pre-line">{areaInfo.howWeHelp}</div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="sticky top-28">
                            <IntakeForm t={t} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;

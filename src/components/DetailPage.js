import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, AlertTriangle, Activity, Shield, Clock, Home, ArrowRight } from 'lucide-react';
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
    const relatedAreas = AREA_STRUCT.filter(a => a.categoryId === areaStruct.categoryId && a.id !== areaId);

    // Content Parser for Bold and Lists
    const renderContent = (content) => {
        if (!content) return null;

        // Split by double newline to separate paragraphs/blocks
        const blocks = content.split('\n\n');

        return blocks.map((block, blockIdx) => {
            // Check if block is a list (numeric or bullet)
            if (block.match(/^(\d+\.|[\*\•])\s/m)) {
                // Split into list items
                const items = block.split('\n').filter(line => line.trim().length > 0);
                return (
                    <div key={blockIdx} className="my-6 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                        <ul className="space-y-4">
                            {items.map((item, itemIdx) => {
                                // Remove list markers for cleaner look
                                const cleanText = item.replace(/^(\d+\.|[\*\•])\s/, '');
                                // Parse bold syntax: **text**
                                const parts = cleanText.split(/(\*\*.*?\*\*)/g);

                                return (
                                    <li key={itemIdx} className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3">
                                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <span className="text-gray-800 leading-relaxed">
                                            {parts.map((part, pIdx) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={pIdx} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            })}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            }

            // Standard Paragraph
            // Parse bold syntax: **text**
            const parts = block.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={blockIdx} className="mb-6 text-gray-700 leading-loose">
                    {parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": `${areaInfo.title} - Car Accident Attorneys`,
        "description": areaInfo.about ? areaInfo.about.substring(0, 160) : areaInfo.desc,
        "url": typeof window !== 'undefined' ? window.location.href : '',
        "provider": {
            "@type": "Attorney",
            "name": "Car Accident Attorneys"
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <div className="bg-[#111] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                {/* Abstract decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-900/20 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8 uppercase tracking-wider font-medium flex-wrap gap-y-2">
                        <button onClick={() => setRoute('home')} className="hover:text-white transition flex items-center">
                            <Home className="w-4 h-4 mr-1" /> {t.nav.home}
                        </button>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        <button onClick={() => setRoute(`category-${areaStruct.categoryId}`)} className="hover:text-white transition">
                            {t.nav.practiceAreas}
                        </button>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        <span className="text-red-500 font-bold">{areaInfo.title}</span>
                    </nav>

                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {areaInfo.title}
                        <span className="block text-red-600 text-2xl md:text-3xl mt-2 font-sans font-normal tracking-wide uppercase">
                            {areaInfo.desc}
                        </span>
                    </h1>
                    <div className="h-2 w-32 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Content - Left Column */}
                    <main className="lg:col-span-8">
                        <article className="max-w-none">
                            <p className="lead text-2xl font-serif text-gray-900 border-l-4 border-red-600 pl-6 italic mb-12">
                                {t.detailPage.introPart1} <strong className="text-red-700">{areaInfo.title}</strong> {t.detailPage.introPart2}
                            </p>

                            {/* About Section */}
                            {areaInfo.about && (
                                <section className="mb-16">
                                    <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
                                        <Shield className="w-8 h-8 text-red-600 mr-3" />
                                        {t.detailPage.aboutTitle}
                                    </h2>
                                    <div className="text-lg text-gray-700 leading-relaxed">
                                        {areaInfo.about}
                                    </div>
                                </section>
                            )}

                            {/* Statistics Section - Redesigned */}
                            {areaInfo.statistics && (
                                <section className="my-16 relative group">
                                    <div className="absolute inset-0 bg-gray-900 transform -skew-y-2 rounded-3xl shadow-2xl"></div>
                                    <div className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex items-center mb-6">
                                            <div className="p-3 bg-red-100 rounded-lg">
                                                <Activity className="w-8 h-8 text-red-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 ml-4 uppercase tracking-wider">
                                                Key Statistics
                                            </h3>
                                        </div>

                                        <div className="min-h-[100px] flex items-center justify-center text-center">
                                            <p className={`text-2xl md:text-3xl font-serif font-bold text-gray-800 transition-all duration-500 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                {Array.isArray(areaInfo.statistics)
                                                    ? areaInfo.statistics[statIndex]
                                                    : areaInfo.statistics}
                                            </p>
                                        </div>

                                        {Array.isArray(areaInfo.statistics) && (
                                            <div className="flex justify-center space-x-2 mt-6">
                                                {areaInfo.statistics.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === statIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* What To Do Section - Redesigned as Timeline */}
                            {areaInfo.whatToDo && (
                                <section className="mt-16">
                                    <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-8">
                                        <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                                        {t.detailPage.whatToDoTitle}
                                    </h2>

                                    {Array.isArray(areaInfo.whatToDo) ? (
                                        <div className="relative border-l-2 border-red-200 ml-3 space-y-8 pl-8 py-2">
                                            {areaInfo.whatToDo.map((item, i) => (
                                                <div key={i} className="relative group">
                                                    <span className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm ring-4 ring-white shadow-md group-hover:scale-110 transition-transform">
                                                        {i + 1}
                                                    </span>
                                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <p className="text-gray-800 font-medium m-0">{item}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="whitespace-pre-line bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                                            {areaInfo.whatToDo}
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Additional Sections */}
                            {areaInfo.additionalSections && areaInfo.additionalSections.map((section, idx) => (
                                <section key={idx} className="mt-16">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-red-100 pb-4">
                                        {section.title}
                                    </h2>
                                    <div className="text-gray-700">
                                        {renderContent(section.content)}
                                    </div>
                                </section>
                            ))}

                            {/* How We Help */}
                            {areaInfo.howWeHelp && (
                                <section className="mt-16 bg-red-900 text-white p-8 rounded-2xl relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Shield className="w-64 h-64" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-6 relative z-10 border-b border-red-800 pb-4">
                                        {t.detailPage.howWeHelpTitle}
                                    </h2>
                                    <div className="text-red-50 text-lg relative z-10 leading-relaxed font-light">
                                        {areaInfo.howWeHelp}
                                    </div>
                                </section>
                            )}
                        </article>
                    </main>

                    {/* Sidebar - Right Column */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            {/* Free Consultation Card */}
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-red-700 p-4 text-center">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t.form.title}</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 text-sm mb-6 text-center">{t.form.subtitle}</p>
                                    <IntakeForm t={t} />
                                </div>
                            </div>

                            {/* Related Topics Widget */}
                            {relatedAreas.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider flex items-center border-b border-gray-200 pb-2">
                                        <ArrowRight className="w-4 h-4 text-red-600 mr-2" />
                                        Related Topics
                                    </h4>
                                    <ul className="space-y-2">
                                        {relatedAreas.map(area => (
                                            <li key={area.id}>
                                                <button
                                                    onClick={() => {
                                                        window.scrollTo(0, 0);
                                                        setRoute(`detail-${area.id}`);
                                                    }}
                                                    className="w-full text-left p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-red-600 font-medium text-sm flex items-center group"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                                                    {t.areas[area.id].title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Why Choose Us Minimal */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider flex items-center border-b border-gray-200 pb-2">
                                    <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                                    {t.detailPage.commitTitle}
                                </h4>
                                <ul className="space-y-3">
                                    {t.detailPage.commitments.map((item, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default DetailPage;

import React, { useState } from 'react';
import { Scale, Globe, Phone, Menu, X } from 'lucide-react';

const Header = ({ lang, setLang, setRoute, t, isScrolled, handleLangChange }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#1a1a1a] shadow-xl py-2' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

                {/* Logo - Fixed Single Line Layout */}
                <div
                    onClick={() => setRoute('home')}
                    className="flex items-center cursor-pointer group z-50 relative"
                >
                    <div className="bg-red-700 p-2 mr-3 shadow-lg">
                        <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center">
                        <span className="font-serif text-lg md:text-2xl lg:text-3xl font-bold text-white tracking-wide uppercase">
                            Car Accident<span className="text-red-600 ml-1">Attorneys</span>
                        </span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center space-x-6">
                    <button
                        onClick={() => setRoute('home')}
                        className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition hover:text-red-500"
                    >
                        {t.nav.home}
                    </button>
                    <button
                        onClick={() => setRoute('practiceAreas')}
                        className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition hover:text-red-500"
                    >
                        {t.nav.practiceAreas}
                    </button>
                    <button
                        onClick={() => setRoute('results')}
                        className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition hover:text-red-500"
                    >
                        {t.nav.results}
                    </button>
                    <button
                        onClick={() => setRoute('blog')}
                        className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition hover:text-red-500"
                    >
                        {t.nav.blog}
                    </button>

                    {/* Language Selector */}
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-1 border border-gray-700 rounded-sm">
                        <Globe className="h-3 w-3 text-gray-400" />
                        <button onClick={() => handleLangChange('en')} className={`text-[10px] font-bold ${lang === 'en' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>English</button>
                        <span className="text-gray-600 text-[10px]">|</span>
                        <button onClick={() => handleLangChange('es')} className={`text-[10px] font-bold ${lang === 'es' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>Español</button>
                        <span className="text-gray-600 text-[10px]">|</span>
                        <button onClick={() => handleLangChange('ko')} className={`text-[10px] font-bold ${lang === 'ko' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>한국어</button>
                        <span className="text-gray-600 text-[10px]">|</span>
                        <button onClick={() => handleLangChange('zh')} className={`text-[10px] font-bold ${lang === 'zh' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>中文</button>
                        <span className="text-gray-600 text-[10px]">|</span>
                        <button onClick={() => handleLangChange('vi')} className={`text-[10px] font-bold ${lang === 'vi' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>Tiếng Việt</button>
                    </div>

                    <a href="tel:555-000-0000" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg transition transform hover:scale-105 flex items-center border border-red-600 whitespace-nowrap">
                        <Phone className="h-3 w-3 mr-2 fill-current" />
                        {t.nav.freeConsult}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="xl:hidden text-white flex items-center gap-4 z-50">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-8 w-8 text-red-500" /> : <Menu className="h-8 w-8" />}
                    </button>
                </div>

                {/* Mobile Full Screen Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-[#111] z-40 flex flex-col items-center justify-center p-8 space-y-8 animate-fade-in">
                        <button
                            onClick={() => { setRoute('home'); setMobileMenuOpen(false); }}
                            className="text-white text-2xl font-serif font-bold uppercase tracking-widest"
                        >
                            {t.nav.home}
                        </button>
                        <button
                            onClick={() => { setRoute('practiceAreas'); setMobileMenuOpen(false); }}
                            className="text-white text-2xl font-serif font-bold uppercase tracking-widest"
                        >
                            {t.nav.practiceAreas}
                        </button>
                        <button
                            onClick={() => { setRoute('results'); setMobileMenuOpen(false); }}
                            className="text-white text-2xl font-serif font-bold uppercase tracking-widest"
                        >
                            {t.nav.results}
                        </button>
                        <button
                            onClick={() => { setRoute('blog'); setMobileMenuOpen(false); }}
                            className="text-white text-2xl font-serif font-bold uppercase tracking-widest"
                        >
                            {t.nav.blog}
                        </button>

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            {['en', 'es', 'ko', 'zh', 'vi'].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => { handleLangChange(l); setMobileMenuOpen(false); }}
                                    className={`px-4 py-2 border ${lang === l ? 'border-red-600 text-red-500' : 'border-gray-700 text-gray-400'} rounded uppercase font-bold`}
                                >
                                    {l === 'en' ? 'English' : l === 'es' ? 'Español' : l === 'ko' ? '한국어' : l === 'zh' ? '中文' : 'Tiếng Việt'}
                                </button>
                            ))}
                        </div>

                        <a href="tel:555-000-0000" className="bg-red-700 text-white px-8 py-4 w-full text-center font-bold uppercase tracking-widest mt-8">
                            {t.nav.freeConsult}
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;

'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MainCategories from '../components/MainCategories';
import Testimonials from '../components/Testimonials';
import CategoryPage from '../components/CategoryPage';
import DetailPage from '../components/DetailPage';
import Footer from '../components/Footer';
import { TRANSLATIONS } from '../locales';
import { getCookie, setCookie } from '../utils';

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState('en');
  const [route, setRoute] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // --- COOKIE EFFECT ---
  // Check for cookie on initial load
  useEffect(() => {
    const savedLang = getCookie('site_lang');
    if (savedLang && ['en', 'es', 'ko', 'zh'].includes(savedLang)) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Handler to update language and save cookie
  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCookie('site_lang', newLang, 365);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // Helper to determine view
  let content;
  if (route === 'home') {
    content = (
      <>
        <Hero t={t} />
        <MainCategories t={t} setRoute={setRoute} />
        <Testimonials t={t} />
        {/* "We Win" Banner */}
        <section className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1a1a1a] transform -skew-x-12 opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 uppercase tracking-tighter">
              We Don&apos;t Just Practice. <br /><span className="text-red-700">We Win.</span>
            </h2>
            <button className="bg-transparent border-2 border-red-700 text-white px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-red-700 transition duration-300">
              View Our Verdicts
            </button>
          </div>
        </section>
      </>
    );
  } else if (route.startsWith('category-')) {
    const catId = route.replace('category-', '');
    content = <CategoryPage catId={catId} t={t} setRoute={setRoute} />;
  } else if (route.startsWith('detail-')) {
    const areaId = route.replace('detail-', '');
    content = <DetailPage areaId={areaId} t={t} setRoute={setRoute} />;
  }

  return (
    <div className="font-sans antialiased text-gray-800 bg-white selection:bg-red-700 selection:text-white">
      <Header
        lang={lang}
        setLang={setLang}
        setRoute={setRoute}
        t={t}
        isScrolled={isScrolled}
        handleLangChange={handleLangChange} // Pass the handler
      />

      <main>
        {content}
      </main>

      <Footer t={t} />
    </div>
  );
}
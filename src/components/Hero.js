import React, { useState, useEffect } from 'react';
import IntakeForm from './IntakeForm';
import Modal from './Modal';
import { ChevronRight } from 'lucide-react';

const Hero = ({ t }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Rotate slogans
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Fade out
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % t.hero.slogans.length);
                setFade(true); // Fade in
            }, 500); // Wait for fade out to complete
        }, 4000); // Total display time 4s

        return () => clearInterval(interval);
    }, [t.hero.slogans.length]);

    return (
        <div
            className="relative min-h-screen flex items-center bg-fixed bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.7)), url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 lg:py-48 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div className="text-white space-y-8 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <div className="h-1 w-12 bg-red-700"></div>
                        <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Las Vegas Injury Attorneys</span>
                    </div>

                    <div className="min-h-[120px] md:min-h-[180px] lg:min-h-[220px]">
                        <h1
                            className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none uppercase tracking-tighter transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {t.hero.slogans[index].l1}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                                {t.hero.slogans[index].l2}
                            </span>
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed border-l-4 border-red-700 pl-6 font-light mx-auto lg:mx-0 text-left">
                        {t.hero.subSlogan}
                    </p>

                    <div className="flex gap-8 pt-6 justify-center lg:justify-start">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">{t.hero.stat1}</h3>
                            <p className="text-xs text-red-500 font-bold uppercase tracking-widest">{t.hero.stat1Label}</p>
                        </div>
                    </div>
                </div>

                {/* Right Content - CTA Button */}
                <div className="lg:ml-auto w-full max-w-md mx-auto flex flex-col items-center justify-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative w-full bg-red-700 hover:bg-red-800 text-white font-black text-xl md:text-2xl uppercase tracking-widest py-8 px-6 rounded shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-red-600 hover:border-red-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {t.heroButton.claimValue}
                            <ChevronRight className="w-8 h-8 animate-pulse" />
                        </span>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <p className="mt-4 text-gray-400 text-sm uppercase tracking-wider font-medium">{t.heroButton.consultation}</p>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <IntakeForm t={t} />
            </Modal>
        </div>
    );
};

export default Hero;

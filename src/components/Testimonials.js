import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = ({ t }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % t.testimonials.reviews.length);
                setFade(true);
            }, 500);
        }, 6000);
        return () => clearInterval(interval);
    }, [t.testimonials.reviews.length]);

    const review = t.testimonials.reviews[index];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-50/50 -z-10"></div>
            <div className="absolute -right-20 -top-20 text-gray-100 opacity-50">
                <Quote size={400} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Testimonials</h2>
                    <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">{t.testimonials.title}</h3>

                    <div className="inline-flex items-center bg-white shadow-lg rounded-full px-6 py-2 mt-6 border border-gray-100">
                        <div className="flex space-x-1 mr-3">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                        </div>
                        <span className="font-bold text-gray-700 text-sm">{t.testimonials.googleRating}</span>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-red-600 relative z-0">
                            {/* Adjusted quotation mark for mobile: hidden on small screens, visible on larger */}
                            <Quote className="hidden md:block text-red-100 w-16 h-16 absolute top-8 left-8 -z-10" />

                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic mb-8 relative z-10 min-h-[120px] flex items-center">
                                "{review.text}"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 mr-4">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {t.testimonials.reviews.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === index ? 'bg-red-600 w-6' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

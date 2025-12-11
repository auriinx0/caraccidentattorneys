import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const LocationSection = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                        Visit Our <span className="text-red-600">Headquarters</span>
                    </h2>
                    <div className="h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We are conveniently located in Las Vegas to serve you better. Stop by for a free consultation.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    {/* Info Side */}
                    <div className="md:w-1/3 p-12 bg-white flex flex-col justify-center relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-red-900"></div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Las Vegas Office</h3>
                            <p className="text-red-600 font-medium">Main Headquarters</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="p-3 bg-red-50 rounded-xl mr-4 text-red-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-900 font-bold mb-1">Address</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        6835 W Tropicana Ave<br />
                                        Suite #100<br />
                                        Las Vegas, NV 89103
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=6835+W+Tropicana+Ave+Suite+100+Las+Vegas+NV+89103"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center uppercase tracking-wider text-sm"
                            >
                                <Navigation className="w-4 h-4 mr-2" />
                                Get Directions
                            </a>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="md:w-2/3 min-h-[400px] bg-gray-100 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.328905335965!2d-115.24156632426744!3d36.1095796063688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c7a8b3b64c63%3A0x7d6b3846e2a22728!2s6835%20W%20Tropicana%20Ave%20%23100%2C%20Las%20Vegas%2C%20NV%2089103!5e0!3m2!1sen!2sus!4v1709420000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="eager"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                            className="absolute inset-0 w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;

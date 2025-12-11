import React from 'react';
import { Scale, MapPin, Phone, DollarSign, Gavel, Award } from 'lucide-react';

const Footer = ({ t }) => (
    <footer className="bg-[#111111] text-white pt-20 pb-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center mb-6">
                        <div className="bg-red-700 p-1.5 mr-2">
                            <Scale className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-xl font-bold uppercase leading-none text-white whitespace-nowrap">Car Accident</span>
                            <span className="font-serif text-xl font-bold uppercase leading-none text-red-600 whitespace-nowrap">Attorneys</span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        We are dedicated to fighting for the rights of the injured. With billions won, our record speaks for itself.
                    </p>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-2 inline-block">Locations</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 text-red-700 shrink-0" />
                            <span>
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=6835+W+Tropicana+Ave+Suite+100+Las+Vegas+NV+89103"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    6835 W Tropicana Ave, Ste. 100<br />Las Vegas, NV 89103
                                </a>
                            </span>
                        </li>
                    </ul>
                    {/* Embedded Map */}
                    <div className="mt-6 rounded-lg overflow-hidden border border-gray-800 h-48 w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.328905335965!2d-115.24156632426744!3d36.1095796063688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c7a8b3b64c63%3A0x7d6b3846e2a22728!2s6835%20W%20Tropicana%20Ave%20%23100%2C%20Las%20Vegas%2C%20NV%2089103!5e0!3m2!1sen!2sus!4v1709420000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                        ></iframe>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-2 inline-block">Contact</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex items-center hover:text-white transition">
                            <Phone className="h-5 w-5 mr-3 text-red-700" />
                            <div className="flex flex-col">
                                <span>(702) 469-3000 ({t.footer.mainOffice})</span>
                            </div>
                        </li>
                        <li className="flex items-center hover:text-white transition">
                            <Phone className="h-5 w-5 mr-3 text-red-700" />
                            <div className="flex flex-col">
                                <span>(702) 389-8888 ({t.footer.newClients})</span>
                            </div>
                        </li>
                        <li className="flex items-center hover:text-white transition">
                            <DollarSign className="h-5 w-5 mr-3 text-red-700" />
                            No Fee Unless We Win
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-2 inline-block">Accolades</h4>
                    <div className="flex space-x-4">
                        <div className="text-center">
                            <Gavel className="h-8 w-8 text-gray-600 mb-1 mx-auto" />
                            <span className="text-[10px] text-gray-600 uppercase">Top 100</span>
                        </div>
                        <div className="text-center">
                            <Award className="h-8 w-8 text-gray-600 mb-1 mx-auto" />
                            <span className="text-[10px] text-gray-600 uppercase">Super Law</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-xs text-gray-600 uppercase tracking-wider">{t.footer.copyright}</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-xs text-gray-600 hover:text-white uppercase tracking-wider">Privacy</a>
                    <a href="#" className="text-xs text-gray-600 hover:text-white uppercase tracking-wider">Terms</a>
                    <a href="#" className="text-xs text-gray-600 hover:text-white uppercase tracking-wider">Disclaimer</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;

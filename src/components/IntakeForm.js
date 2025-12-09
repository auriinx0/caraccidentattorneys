import React, { useState } from 'react';
import { Calendar, Clock as ClockIcon, ChevronRight } from 'lucide-react';
import { GOOGLE_SCRIPT_URL, ACCESS_KEY, US_STATES } from '../constants';

const IntakeForm = ({ t }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        phone: '',
        email: '',
        state: '',
        accidentDate: '',
        accidentTime: '',
        accidentDetails: '',
        injuryDetails: ''
    });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const combinedAccidentDetails = `[Occurred: ${formData.accidentDate} at ${formData.accidentTime}] [State: ${formData.state}] ${formData.accidentDetails}`;

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    accidentDetails: combinedAccidentDetails,
                    date: new Date().toLocaleString()
                })
            });

            await fetch("https://api.web3forms.com/submit", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    ...formData,
                    accidentDetails: combinedAccidentDetails,
                    subject: "New Lead from Website"
                })
            });

            setStatus('sent');
            setFormData({ firstName: '', phone: '', email: '', state: '', accidentDate: '', accidentTime: '', accidentDetails: '', injuryDetails: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white rounded-none shadow-2xl p-6 md:p-8 border-t-8 border-red-700 relative z-20">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.form.title}</h3>
            <p className="text-gray-600 text-sm md:text-lg mb-6 font-medium">{t.form.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.nameLabel}</label>
                    <input
                        required
                        type="text"
                        placeholder={t.form.nameLabel}
                        className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.phoneLabel}</label>
                    <input
                        required
                        type="tel"
                        placeholder={t.form.phoneLabel}
                        className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.emailLabel}</label>
                    <input
                        required
                        type="email"
                        placeholder={t.form.emailLabel}
                        className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.stateLabel}</label>
                    <div className="relative">
                        <select
                            required
                            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition appearance-none"
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value })}
                        >
                            <option value="" disabled>Select State</option>
                            {US_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <ChevronRight className="h-4 w-4 rotate-90" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-900 font-bold mb-1 text-sm flex items-center">
                            <Calendar className="w-3 h-3 mr-1" /> {t.form.dateLabel}
                        </label>
                        <input
                            required
                            type="date"
                            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
                            value={formData.accidentDate}
                            onChange={e => setFormData({ ...formData, accidentDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 font-bold mb-1 text-sm flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" /> {t.form.timeLabel}
                        </label>
                        <div className="relative">
                            <select
                                required
                                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition appearance-none"
                                value={formData.accidentTime}
                                onChange={e => setFormData({ ...formData, accidentTime: e.target.value })}
                            >
                                <option value="" disabled>Select Time</option>
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const hour = i % 12 === 0 ? 12 : i % 12;
                                    const ampm = i < 12 ? 'AM' : 'PM';
                                    const nextHour = (i + 1) % 12 === 0 ? 12 : (i + 1) % 12;
                                    const nextAmpm = (i + 1) < 12 || (i + 1) === 24 ? 'AM' : 'PM';
                                    const label = `${hour}:00 ${ampm} - ${nextHour}:00 ${nextAmpm}`;
                                    return <option key={i} value={label}>{label}</option>;
                                })}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                <ChevronRight className="h-4 w-4 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.accidentLabel}</label>
                    <textarea
                        required
                        rows="2"
                        placeholder="What Happened?"
                        className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
                        value={formData.accidentDetails}
                        onChange={e => setFormData({ ...formData, accidentDetails: e.target.value })}
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.injuryLabel}</label>
                    <textarea
                        required
                        rows="2"
                        placeholder="Describe Your Injuries"
                        className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
                        value={formData.injuryDetails}
                        onChange={e => setFormData({ ...formData, injuryDetails: e.target.value })}
                    ></textarea>
                </div>

                <button
                    disabled={status === 'sending' || status === 'sent'}
                    type="submit"
                    className={`w-full py-4 font-black text-white rounded shadow-lg uppercase tracking-widest text-sm transition duration-300 transform hover:-translate-y-1 ${status === 'sent' ? 'bg-green-700' : 'bg-red-700 hover:bg-red-800'}`}
                >
                    {status === 'sending' ? t.form.sending : status === 'sent' ? t.form.success : status === 'error' ? t.form.error : t.form.submitBtn}
                </button>

                <p className="text-[10px] text-gray-400 leading-tight">
                    {t.form.disclaimer}
                </p>
            </form>
        </div>
    );
};

export default IntakeForm;

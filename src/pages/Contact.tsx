import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import { MapPin, Phone, Mail, Building2, User } from 'lucide-react';

export function Contact() {
    const { cmsConfig } = useGlobal();
    const { contact } = cmsConfig;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-16 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    We are here to assist you with all your financial needs. Reach out to us through any of the channels below.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Cards */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Our Office</h3>
                        <p className="text-slate-600 leading-relaxed">{contact.address}</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                        <p className="text-slate-600 font-mono text-lg">{contact.phone}</p>
                        {contact.secondaryPhone && (
                            <p className="text-slate-500 font-mono mt-1">{contact.secondaryPhone}</p>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                        <p className="text-slate-600">{contact.email}</p>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold">
                            <Building2 className="w-4 h-4" /> About Our Company
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Trusted Financial Partner Since 1993</h2>
                        <div className="prose prose-lg prose-slate text-slate-600">
                            <p>{contact.about || "GK Groups has been a pioneer in providing secure and reliable financial services. Our mission is to empower individuals and businesses to achieve financial freedom through our diverse range of products including Chit Funds, Personal Loans, and Investment services."}</p>
                        </div>
                    </div>
                    <div className="bg-slate-200 rounded-3xl h-80 w-full flex items-center justify-center relative overflow-hidden">
                        {/* Placeholder for Company Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>
                        <div className="relative z-10 text-center text-white p-8">
                            <User className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                            <h3 className="text-2xl font-bold">Visionary Leadership</h3>
                            <p className="text-slate-400 mt-2">Founded on principles of Trust & Integrity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

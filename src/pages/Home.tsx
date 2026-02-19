import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Home() {
    const { cmsConfig } = useGlobal();

    // Helper to dynamically render Lucide icons
    const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
        const IconComponent = (Icons as any)[name];
        return IconComponent ? <IconComponent className={className} /> : <Icons.Circle className={className} />;
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Ticker Section */}
            {cmsConfig.ticker && (
                <div className="bg-slate-900 text-white py-2 overflow-hidden relative">
                    <div className="animate-marquee whitespace-nowrap inline-block">
                        <span className="mx-4 font-medium text-sm tracking-wide">{cmsConfig.ticker}</span>
                        <span className="mx-4 font-medium text-sm tracking-wide">•</span>
                        <span className="mx-4 font-medium text-sm tracking-wide">{cmsConfig.ticker}</span>
                        <span className="mx-4 font-medium text-sm tracking-wide">•</span>
                        <span className="mx-4 font-medium text-sm tracking-wide">{cmsConfig.ticker}</span>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left/Center: Feature Grid (3 cols wide) */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {cmsConfig.features.map((feat) => (
                                <Link
                                    key={feat.id}
                                    to={feat.path}
                                    className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 relative overflow-hidden"
                                >
                                    <div className={`w-14 h-14 rounded-xl ${feat.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <DynamicIcon name={feat.icon} className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.label}</h3>
                                    <div className="flex items-center gap-1 text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        Explore Service <Icons.ArrowRight className="w-4 h-4" />
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-slate-50/0 group-hover:from-indigo-50/30 group-hover:to-indigo-100/30 transition-all duration-300 pointer-events-none" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar: Ads & Announcements (1 col wide) */}
                    <div className="space-y-8">
                        {/* Advertising */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                                <Icons.Zap className="w-5 h-5" /> Special Offers
                            </h3>

                            {/* Ad Media (Image/Video) */}
                            {cmsConfig.sidebar.adMediaUrl && (
                                <div className="mb-4 rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={cmsConfig.sidebar.adMediaUrl}
                                        alt="Special Offer"
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            // Fallback if image fails or if it's a video URL (basic handling)
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            <div className="prose prose-sm prose-amber">
                                <ReactMarkdown>{cmsConfig.sidebar.ads}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Icons.Bell className="w-5 h-5 text-indigo-600" /> Announcements
                            </h3>
                            <div className="prose prose-sm prose-slate">
                                <ReactMarkdown>{cmsConfig.sidebar.announcements}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <Link
                            to="/contact"
                            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" /> Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

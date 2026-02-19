import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MessageCircle, Instagram, Facebook, MapPin } from 'lucide-react';
import { logoSrc } from '../data/mockData';

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-pattern-dots opacity-5" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer */}
                <div className="py-16 grid md:grid-cols-4 gap-10">
                    {/* About Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-lg bg-gradient-premium shadow-glow-green flex items-center justify-center">
                                <img src={logoSrc} alt="GK" className="w-10 h-10 object-contain" />
                            </div>
                            <div>
                                <span className="text-xl font-display font-extrabold gradient-text-gold">GK GROUPS</span>
                                <p className="text-xs text-slate-400">Financial Services Since 1993</p>
                            </div>
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Your trusted partner in financial growth. We provide comprehensive chit funds, personal finance, credit card, and investment solutions with unmatched transparency and security.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse-slow" />
                            <span>in India</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display font-bold text-white mb-4 text-lg">Quick Links</h3>
                        <div className="space-y-3">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/chits', label: 'Chit Funds' },
                                { to: '/pf', label: 'Personal Finance' },
                                { to: '/contact', label: 'Contact Us' },
                                { to: '/admin', label: 'Admin Portal' },
                            ].map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="block text-slate-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform"
                                >
                                    → {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-display font-bold text-white mb-4 text-lg">Get in Touch</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-slate-300">
                                    <div>+91-9393636060</div>
                                    <div>+91-8639121314</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MessageCircle className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <a href="https://wa.me/717396688988" className="text-sm text-slate-300 hover:text-primary-400 transition-colors">
                                    +91-7396688988
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <a href="mailto:bookofaccts@gmail.com" className="text-sm text-slate-300 hover:text-primary-400 transition-colors break-all">
                                    bookofaccts@gmail.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-300">
                                    Hyderabad, Telangana
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-slate-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-400">
                            © {new Date().getFullYear()} GK GROUPS — All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com/gk.groups_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://facebook.com/gk.groups_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://wa.me/717396688988" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="flex gap-4 text-sm">
                            <Link to="/contact" className="text-slate-400 hover:text-primary-400 transition-colors">
                                Privacy
                            </Link>
                            <Link to="/contact" className="text-slate-400 hover:text-primary-400 transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

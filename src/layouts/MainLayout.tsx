import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Phone, Mail, MapPin, LogIn, Megaphone, Info, LogOut, Menu, X } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { logoSrc } from '../data/mockData';

export function MainLayout() {
    const { user, setUser } = useGlobal();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative overflow-hidden">
            {/* Watermark */}
            <div className="watermark font-display">GK</div>

            {/* Background Pattern */}
            <div className="fixed inset-0 bg-pattern-dots opacity-30 pointer-events-none z-0" />

            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-primary-100/50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-10">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-premium rounded-xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
                            GK
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-display font-black gradient-text-premium tracking-tight">
                                GK Groups
                            </span>
                            <span className="text-[10px] text-primary-600 font-bold tracking-widest uppercase">Financial Services</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <Link to="/" className="text-slate-600 hover:text-primary-600 font-bold transition-colors relative group">
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link to="/chits" className="text-slate-600 hover:text-primary-600 font-bold transition-colors relative group">
                                Chit Funds
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link to="/contact" className="text-slate-600 hover:text-primary-600 font-bold transition-colors relative group">
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </nav>

                        <div className="h-8 w-px bg-slate-200"></div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-bold text-slate-900">{user.name}</div>
                                    <div className="text-xs text-primary-600 font-medium">{user.id}</div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors shadow-sm"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn-premium flex items-center gap-2 py-2.5 px-6 text-sm shadow-glow-green"
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4 animate-fade-in z-50">
                        <Link to="/" className="text-slate-600 font-bold py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link to="/chits" className="text-slate-600 font-bold py-2" onClick={() => setMobileMenuOpen(false)}>Chit Funds</Link>
                        <Link to="/contact" className="text-slate-600 font-bold py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        {user ? (
                            <button onClick={handleLogout} className="text-red-600 font-bold py-2 text-left">Logout</button>
                        ) : (
                            <Link to="/login" className="text-primary-600 font-bold py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                        )}
                    </div>
                )}
            </header>

            <div className="flex-1 container mx-auto px-4 py-8 flex gap-8 relative z-10">
                {/* Main Content Area */}
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>

                {/* Right Sidebar */}
                <aside className="w-80 hidden xl:flex flex-col gap-6 shrink-0">
                    {/* Advertisements */}
                    <div className="bg-gradient-premium rounded-3xl shadow-premium p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-500/30 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                        <div className="relative z-10">
                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-4 border border-white/10">
                                Limited Time
                            </div>
                            <h3 className="font-display font-black text-2xl mb-2">Special Offer!</h3>
                            <p className="text-primary-50 text-sm mb-6 font-medium leading-relaxed">
                                Get <span className="text-secondary-300 font-bold">0% processing fee</span> on Personal Loans this month.
                            </p>
                            <button className="w-full py-3 bg-white text-primary-700 rounded-xl text-sm font-bold shadow-lg hover:bg-primary-50 transition-colors transform hover:-translate-y-1">
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="card-glass p-6">
                        <div className="flex items-center gap-2 mb-6 text-secondary-600 font-bold uppercase tracking-wider text-xs">
                            <Megaphone className="w-4 h-4" />
                            Latest Updates
                        </div>
                        <div className="space-y-6">
                            <div className="group cursor-pointer">
                                <span className="text-[10px] font-bold text-slate-400 block mb-1">Nov 28, 2025</span>
                                <p className="text-sm text-slate-700 font-medium group-hover:text-primary-600 transition-colors leading-snug">
                                    New Chit Fund groups starting from next month. Join now!
                                </p>
                            </div>
                            <div className="w-full h-px bg-slate-100"></div>
                            <div className="group cursor-pointer">
                                <span className="text-[10px] font-bold text-slate-400 block mb-1">Nov 25, 2025</span>
                                <p className="text-sm text-slate-700 font-medium group-hover:text-primary-600 transition-colors leading-snug">
                                    Updated interest rates for fixed deposits. Check new rates.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer Removed as per user request */}
        </div>
    );
}


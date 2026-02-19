import { Link } from 'react-router-dom';
import type { UserLite } from '../types';
import { logoSrc } from '../data/mockData';
import { User, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    user: UserLite | null;
    onLogin: () => void;
    onLogout: () => void;
}

export function Header({ user, onLogin, onLogout }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-primary-100 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-premium shadow-lg group-hover:shadow-glow-green transition-all duration-300 flex items-center justify-center overflow-hidden">
                            <img
                                src={logoSrc}
                                alt="GK"
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                        <div>
                            <p className="text-xl font-display font-extrabold leading-none gradient-text-premium">
                                GK GROUPS
                            </p>
                            <p className="text-xs text-primary-600 leading-none mt-0.5 font-medium">Since 1993</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/chits', label: 'Chit Funds' },
                            { to: '/pf', label: 'Finance' },
                            { to: '/cc', label: 'Credit Card' },
                            { to: '/stocks', label: 'Trading' },
                        ].map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 relative group"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-premium group-hover:w-4/5 transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border border-primary-200">
                                    <User className="w-4 h-4 text-primary-700" />
                                    <span className="text-sm font-bold text-primary-900">{user.name}</span>
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onLogin}
                                className="btn-premium text-sm py-2.5 flex items-center gap-2"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-primary-100 animate-fade-in">
                        <nav className="flex flex-col gap-2">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/chits', label: 'Chit Funds' },
                                { to: '/pf', label: 'Personal Finance' },
                                { to: '/cc', label: 'Credit Card' },
                                { to: '/stocks', label: 'Trading & Funds' },
                            ].map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

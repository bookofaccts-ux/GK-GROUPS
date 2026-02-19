import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { LogIn, User, Lock, ArrowRight, Mail, Phone, ShieldCheck } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useGlobal();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    // Login State
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Register State
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !password) {
            setLoginError('Please enter User ID and Password');
            return;
        }
        // Mock Login
        setUser({
            id: userId,
            name: 'Demo User',
            services: ['Chits', 'Loans'],
            phone: '9876543210'
        });
        navigate('/dashboard');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Register
        alert('Registration successful! Please login.');
        setIsRegistering(false);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Forgot Password
        alert('Password reset link sent to your email.');
        setIsForgotPassword(false);
    };

    if (isForgotPassword) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 animate-fade-in">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
                        <p className="text-slate-500 mt-2">Enter your email to receive reset instructions</p>
                    </div>
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all">
                            Send Reset Link
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsForgotPassword(false)}
                            className="w-full py-3.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Left Side - Hero/Branding */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-12 flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/30 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xl">GK</div>
                        <span className="text-2xl font-bold">GK Finserv</span>
                    </div>
                    <h1 className="text-5xl font-black leading-tight mb-6">
                        Secure Your <br />
                        <span className="text-yellow-300">Financial Future</span>
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
                        Join thousands of users who trust GK Finserv for their Chit Funds, Loans, and Investment needs.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <ShieldCheck className="w-8 h-8 text-yellow-300 mb-3" />
                        <h3 className="font-bold text-lg">100% Secure</h3>
                        <p className="text-indigo-200 text-sm">Bank-grade encryption for all your data.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <User className="w-8 h-8 text-yellow-300 mb-3" />
                        <h3 className="font-bold text-lg">24/7 Support</h3>
                        <p className="text-indigo-200 text-sm">Dedicated relationship managers for you.</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12 bg-white">
                <div className="w-full max-w-md space-y-8 animate-fade-in">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">
                            {isRegistering ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-slate-500">
                            {isRegistering ? 'Start your financial journey with us today.' : 'Please enter your details to sign in.'}
                        </p>
                    </div>

                    {isRegistering ? (
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={regName}
                                        onChange={e => setRegName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        value={regEmail}
                                        onChange={e => setRegEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        required
                                        value={regPhone}
                                        onChange={e => setRegPhone(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transform active:scale-95 transition-all flex items-center justify-center gap-2">
                                Create Account <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">User ID</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={e => setUserId(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        placeholder="Enter your ID"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>

                            {loginError && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                    {loginError}
                                </div>
                            )}

                            <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transform active:scale-95 transition-all flex items-center justify-center gap-2">
                                <LogIn className="w-5 h-5" />
                                Login Securely
                            </button>
                        </form>
                    )}

                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 font-medium">
                            {isRegistering ? "Already have an account?" : "Don't have an account yet?"}
                            <button
                                onClick={() => { setIsRegistering(!isRegistering); setLoginError(''); }}
                                className="ml-2 text-indigo-600 font-bold hover:underline"
                            >
                                {isRegistering ? 'Login' : 'Register Now'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

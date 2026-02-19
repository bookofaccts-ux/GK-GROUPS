import React from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Gavel,
    Layers,
    Banknote,
    Percent,
    CreditCard,
    RefreshCcw,
    TrendingUp,
    MessageSquare
} from 'lucide-react';

export function AdminDashboard() {
    const tabs = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, desc: 'Overview & Stats', color: 'bg-blue-500' },
        { name: 'User Home Page', path: '/admin/cms', icon: Layers, desc: 'Manage CMS Content', color: 'bg-indigo-500' },
        { name: 'Live Chit Funds', path: '/admin/auction', icon: Gavel, desc: 'Live Auction Room', color: 'bg-emerald-500' },
        { name: 'Chit Funds', path: '/admin/chits', icon: Banknote, desc: 'Manage Batches', color: 'bg-teal-500' },
        { name: 'Personal Loans', path: '/admin/loans', icon: Banknote, desc: 'Loan Management', color: 'bg-cyan-500' },
        { name: 'Personal Interests', path: '/admin/deposits', icon: Percent, desc: 'Deposit Interests', color: 'bg-sky-500' },
        { name: 'Credit Cards', path: '/admin/cards', icon: CreditCard, desc: 'Card Services', color: 'bg-violet-500' },
        { name: 'Forex Conversions', path: '/admin/forex', icon: RefreshCcw, desc: 'Currency Exchange', color: 'bg-fuchsia-500' },
        { name: 'Stock Markets', path: '/admin/stocks', icon: TrendingUp, desc: 'Market Updates', color: 'bg-pink-500' },
        { name: 'Users & Login Data', path: '/admin/users', icon: Users, desc: 'User Administration', color: 'bg-rose-500' },
        { name: 'Messages / Requests', path: '/admin/messages', icon: MessageSquare, desc: 'Support Inbox', color: 'bg-orange-500' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Control Panel</h1>
                    <p className="text-slate-500">Select a module to manage</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tabs.map((tab, idx) => (
                        <Link
                            key={idx}
                            to={tab.path}
                            className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 p-6 flex flex-col items-center text-center hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${tab.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <tab.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{tab.name}</h3>
                            <p className="text-sm text-slate-400">{tab.desc}</p>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-slate-50/0 group-hover:from-indigo-50/30 group-hover:to-indigo-100/30 transition-all duration-300 pointer-events-none" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

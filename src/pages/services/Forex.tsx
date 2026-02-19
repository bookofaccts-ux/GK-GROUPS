import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { RefreshCw, Send, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Forex() {
    const { user, forexRequests, addForexRequest } = useGlobal();
    const [activeTab, setActiveTab] = useState<'new' | 'track'>('new');

    // Form State
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !user) return;

        addForexRequest({
            name: user.name,
            amount: parseFloat(amount),
            fromCurrency,
            toCurrency
        });

        setSuccessMsg('Request placed successfully! Waiting for admin approval.');
        setAmount('');
        setTimeout(() => {
            setSuccessMsg('');
            setActiveTab('track');
        }, 2000);
    };

    const myRequests = forexRequests.filter(req => req.userId === user?.id);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-rose-500" />
                        Forex Conversions
                    </h1>
                    <p className="text-slate-500 mt-2">Best rates for currency conversion and international transfers.</p>
                </div>
                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'new'
                                ? 'bg-rose-500 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        New Request
                    </button>
                    <button
                        onClick={() => setActiveTab('track')}
                        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'track'
                                ? 'bg-rose-500 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        Track Requests
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'new' && (
                    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Place New Conversion Request</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={user?.name || ''}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
                                            <select
                                                value={fromCurrency}
                                                onChange={(e) => setFromCurrency(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                                            >
                                                <option value="USD">USD</option>
                                                <option value="INR">INR</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                            </select>
                                        </div>
                                        <div className="pb-3 text-slate-400">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
                                            <select
                                                value={toCurrency}
                                                onChange={(e) => setToCurrency(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                                            >
                                                <option value="INR">INR</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {successMsg && (
                                    <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        {successMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'track' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Your Requests</h2>

                        {myRequests.length > 0 ? (
                            <div className="grid gap-4">
                                {myRequests.map((req) => (
                                    <div key={req.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${req.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                                    req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                                        'bg-red-50 text-red-600'
                                                }`}>
                                                {req.status === 'Pending' && <Clock className="w-6 h-6" />}
                                                {req.status === 'Approved' && <CheckCircle className="w-6 h-6" />}
                                                {req.status === 'Rejected' && <XCircle className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    {req.amount} {req.fromCurrency} <span className="text-slate-400">→</span> {req.toCurrency}
                                                </h3>
                                                <p className="text-sm text-slate-500">ID: {req.id} • {req.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${req.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {req.status}
                                            </span>
                                            {req.adminComment && (
                                                <p className="text-xs text-slate-500 max-w-xs text-right">
                                                    Admin: {req.adminComment}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                                <p className="text-slate-500">No requests found. Start a new conversion request.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

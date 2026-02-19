import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { formatINR } from '../../utils/helpers';
import { Users, Wallet, TrendingUp, Calendar, CheckCircle, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export function PersonalLoans() {
    const { user, batches, userFinance } = useGlobal();
    const [activeTab, setActiveTab] = useState<'chits' | 'loans' | 'interest'>('chits');
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

    // Auto-rotate batches every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBatchIndex((prev) => (prev + 1) % batches.length);
        }, 30000);
        return () => clearInterval(interval);
    }, [batches.length]);

    const currentBatch = batches[currentBatchIndex];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Personal Finance Dashboard</h1>
                    <p className="text-slate-500 mt-2">Manage your chits, loans, and investments in one place.</p>
                </div>
                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                    <button
                        onClick={() => setActiveTab('chits')}
                        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'chits'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        Chit Funds
                    </button>
                    <button
                        onClick={() => setActiveTab('loans')}
                        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'loans'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        Loan Services
                    </button>
                    <button
                        onClick={() => setActiveTab('interest')}
                        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'interest'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        Interest Services
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'chits' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        {/* Hanging Board - Live Batch Status */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xl">
                                        {currentBatch.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{currentBatch.name}</h3>
                                        <p className="text-indigo-300 text-sm">Batch Code: {currentBatch.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold mb-1">Current Month</div>
                                    <div className="text-2xl font-bold">{currentBatch.currentMonth}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                                <div>
                                    <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold mb-2">Chit Value</div>
                                    <div className="text-2xl font-bold">₹{formatINR(currentBatch.value)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold mb-2">Subscription</div>
                                    <div className="text-2xl font-bold">₹{formatINR(currentBatch.subscription)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold mb-2">Dividend</div>
                                    <div className="text-2xl font-bold text-emerald-400">+₹{formatINR(currentBatch.dividend)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold mb-2">Next Auction</div>
                                    <div className="text-lg font-bold flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-indigo-400" />
                                        {currentBatch.nextAuction}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center gap-2">
                                {batches.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1 rounded-full transition-all duration-500 ${idx === currentBatchIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* My Chits */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-600" />
                                My Active Chits
                            </h2>

                            {userFinance.chits.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6">
                                    {userFinance.chits.map((chit) => (
                                        <div key={chit.batchId} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                                                        {chit.batchId.split('-')[1]}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-slate-900">{chit.batchName}</h3>
                                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                                            <span>Value: ₹{formatINR(chit.value)}</span>
                                                            <span>•</span>
                                                            <span>Term: {chit.term} Months</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className={`px-4 py-2 rounded-lg text-sm font-bold ${chit.bidWon ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                                        {chit.bidWon ? 'Bid Won' : 'Bid Available'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div>
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Payment Status</p>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-slate-600">Total Paid</span>
                                                            <span className="font-bold text-slate-900">₹{formatINR(chit.totalPaid)}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-slate-600">Pending</span>
                                                            <span className="font-bold text-slate-900">₹{formatINR(chit.pendingAmount)}</span>
                                                        </div>
                                                        <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                                                            <div
                                                                className="bg-indigo-600 h-full rounded-full"
                                                                style={{ width: `${(chit.totalPaid / chit.value) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">Recent History</p>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {chit.history.map((h, i) => (
                                                            <div key={i} className="bg-slate-50 rounded-lg p-3 text-center">
                                                                <div className="text-xs text-slate-500 mb-1">{h.month}</div>
                                                                <div className="font-bold text-slate-900 text-sm">₹{formatINR(h.amount)}</div>
                                                                <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center justify-center gap-1">
                                                                    <CheckCircle className="w-3 h-3" /> Paid
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-slate-500">No active chits found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'loans' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-indigo-600" />
                            Active Loans
                        </h2>

                        {userFinance.loans.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userFinance.loans.map((loan) => (
                                    <div key={loan.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{loan.type} Loan</h3>
                                                <p className="text-sm text-slate-500">ID: {loan.id}</p>
                                            </div>
                                            <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
                                                {loan.status}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                                <span className="text-slate-600 text-sm">Loan Amount</span>
                                                <span className="font-bold text-slate-900 text-lg">₹{formatINR(loan.amount)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600 text-sm">Interest Rate</span>
                                                <span className="font-medium text-slate-900">{loan.interestRate}% p.a.</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600 text-sm">Taken On</span>
                                                <span className="font-medium text-slate-900">{loan.date}</span>
                                            </div>

                                            <div className="bg-slate-50 rounded-xl p-4 mt-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-slate-600 text-sm font-medium">Total Pending</span>
                                                    <span className="font-bold text-red-600">₹{formatINR(loan.totalPending)}</span>
                                                </div>
                                                <div className="text-xs text-slate-500 flex justify-between">
                                                    <span>Principal: ₹{formatINR(loan.pendingPrincipal)}</span>
                                                    <span>Interest Paid: ₹{formatINR(loan.interestPaid)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">No Open Loans</h3>
                                <p className="text-slate-500">You don't have any active loans at the moment.</p>
                                <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                    Apply for Loan
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'interest' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-600" />
                            Interest Services
                        </h2>

                        {userFinance.deposits.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userFinance.deposits.map((deposit) => (
                                    <div key={deposit.id} className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="font-bold text-lg">Fixed Deposit</h3>
                                                <p className="text-emerald-100 text-sm">ID: {deposit.id}</p>
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <TrendingUp className="w-5 h-5 text-white" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                                <span className="text-emerald-100 text-sm">Principal Amount</span>
                                                <span className="font-bold text-white text-xl">₹{formatINR(deposit.amount)}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-emerald-100 text-xs block mb-1">Interest Rate</span>
                                                    <span className="font-bold">{deposit.interestRate}% p.a.</span>
                                                </div>
                                                <div>
                                                    <span className="text-emerald-100 text-xs block mb-1">Interest Earned</span>
                                                    <span className="font-bold">+₹{formatINR(deposit.interestEarned)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-emerald-100 text-xs block mb-1">Invested On</span>
                                                    <span className="font-medium text-sm">{deposit.date}</span>
                                                </div>
                                                <div>
                                                    <span className="text-emerald-100 text-xs block mb-1">Status</span>
                                                    <span className="font-medium text-sm bg-white/20 px-2 py-0.5 rounded inline-block">{deposit.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Start Investing Today</h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    "Kindly Deposit your money and start investing and let your money grow in silence."
                                </p>
                                <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                    Start Investment
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

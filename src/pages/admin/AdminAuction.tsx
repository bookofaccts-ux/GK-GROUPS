import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { Save, RefreshCw, Play, Square, History } from 'lucide-react';
import type { AuctionConfig } from '../../types';

export function AdminAuction() {
    const { auctionConfig, setAuctionConfig, auctionState, setAuctionState, pfLive } = useGlobal();
    const [formData, setFormData] = useState<AuctionConfig>(auctionConfig);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setFormData(auctionConfig);
    }, [auctionConfig]);

    const handleChange = (key: keyof AuctionConfig, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setIsDirty(true);
    };

    const handleSave = () => {
        setAuctionConfig(formData);
        setIsDirty(false);
        alert('Auction Configuration Saved!');
    };

    const handleResetAuction = () => {
        if (confirm('Are you sure? This will reset the auction timer and state.')) {
            setAuctionConfig(formData);
            setAuctionState({
                secondsLeft: 600,
                endTime: undefined, // Clear endTime to allow re-initialization
                running: false,
                finished: false,
                currentLoss: Math.floor(formData.chitValue * (formData.commissionRate / 100)),
                bidders: [],
            });
            alert('Auction Reset Successfully!');
        }
    };

    const toggleTimer = () => {
        setAuctionState(prev => ({ ...prev, running: !prev.running }));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Auction Configuration</h2>
                    <p className="text-slate-500 text-sm">Configure parameters for the live auction room.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={toggleTimer}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white transition-colors shadow-lg ${auctionState.running
                            ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
                            : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'
                            }`}
                    >
                        {auctionState.running ? <><Square className="w-4 h-4" /> Stop Timer</> : <><Play className="w-4 h-4" /> Start Auction</>}
                    </button>
                    <button
                        onClick={handleResetAuction}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-bold hover:bg-orange-200 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isDirty}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white shadow-lg transition-all ${isDirty
                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 transform hover:-translate-y-0.5'
                            : 'bg-slate-300 cursor-not-allowed'
                            }`}
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

            {/* Live Status Banner */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${auctionState.running ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Status</div>
                        <div className="font-mono font-bold text-lg">{auctionState.running ? 'LIVE' : 'STOPPED'}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-400 uppercase font-bold">Time Remaining</div>
                    <div className="font-mono font-bold text-2xl text-emerald-400">
                        {Math.floor(auctionState.secondsLeft / 60)}:{(auctionState.secondsLeft % 60).toString().padStart(2, '0')}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Settings */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900 border-b pb-2 mb-4">Basic Settings</h3>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Auction Date</label>
                        <input
                            value={formData.dateMonth}
                            onChange={e => handleChange('dateMonth', e.target.value)}
                            className="w-full font-medium border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start Month</label>
                            <input
                                value={formData.startMonth}
                                onChange={e => handleChange('startMonth', e.target.value)}
                                className="w-full font-medium border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">End Month</label>
                            <input
                                value={formData.endMonth}
                                onChange={e => handleChange('endMonth', e.target.value)}
                                className="w-full font-medium border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Running Month</label>
                        <input
                            value={formData.runningMonth}
                            onChange={e => handleChange('runningMonth', e.target.value)}
                            className="w-full font-medium border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                        />
                    </div>
                </div>

                {/* Financials */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900 border-b pb-2 mb-4">Financial Parameters</h3>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Chit Value (₹)</label>
                        <input
                            type="number"
                            value={formData.chitValue}
                            onChange={e => handleChange('chitValue', Number(e.target.value))}
                            className="w-full font-bold text-lg text-indigo-600 border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Commission (%)</label>
                            <input
                                type="number"
                                value={formData.commissionRate}
                                onChange={e => handleChange('commissionRate', Number(e.target.value))}
                                className="w-full font-medium border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Min Loss (Calc)</label>
                            <div className="py-1 font-medium text-slate-400">
                                ₹ {Math.floor(formData.chitValue * (formData.commissionRate / 100)).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Room Code</label>
                        <input
                            value={formData.roomCode}
                            onChange={e => handleChange('roomCode', e.target.value)}
                            className="w-full font-mono font-bold text-slate-700 border-b border-slate-200 focus:border-indigo-500 outline-none py-1"
                        />
                    </div>
                </div>

                {/* Ticker & Extras */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
                    <h3 className="font-bold text-slate-900 border-b pb-2 mb-4">Display Settings</h3>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Marquee Ticker Text</label>
                        <textarea
                            value={formData.ticker}
                            onChange={e => handleChange('ticker', e.target.value)}
                            className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            {/* Auction Results / Automation Check */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 border-b pb-2 mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-600" /> Auction Results (Automation)
                </h3>
                {auctionState.finished ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                ✓
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-900">Auction Finalized</h4>
                                <p className="text-xs text-emerald-700">Values have been saved to Personal Finance records.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                            <div>
                                <div className="text-slate-500">Winner</div>
                                <div className="font-bold">{auctionState.winner?.name || 'None'}</div>
                            </div>
                            <div>
                                <div className="text-slate-500">Winning Bid</div>
                                <div className="font-bold">₹ {auctionState.winner?.winnerLoss.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-slate-500">Total Loss (Comm + Bid)</div>
                                <div className="font-bold text-red-600">₹ {auctionState.winner?.finalLoss.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        Auction is currently {auctionState.running ? 'running' : 'pending'}. Results will appear here after finalization.
                    </div>
                )}
            </div>
        </div>
    );
}

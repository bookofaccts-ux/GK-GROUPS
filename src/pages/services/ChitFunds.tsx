import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { formatINR, isTop1Bidder } from '../../utils/helpers';
import { InfoPill, BoardItem } from '../../components/ui/Atoms';
import { TimerDigits } from '../../components/TimerDigits';
import type { Bidder } from '../../types';
import { Users, Clock, AlertCircle } from 'lucide-react';

export function ChitFunds() {
    const navigate = useNavigate();
    const { user, auctionConfig, auctionState, setAuctionState } = useGlobal();

    const { dateMonth, chitValue, joinedUsers, ticker, roomCode } = auctionConfig;
    const { bidders } = auctionState;
    const currentLossDisplay = auctionState.currentLoss;
    const inHandDisplay = useMemo(() => Math.max(chitValue - currentLossDisplay, 0), [chitValue, currentLossDisplay]);

    const [roomInput, setRoomInput] = useState("");
    const [joined, setJoined] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const showErr = (m: string) => {
        setErr(m);
        setTimeout(() => setErr(null), 2000);
    };

    const tryJoin = () => {
        if (roomInput.trim() === roomCode) {
            setJoined(true);
            showErr('Joined auction room ✅');
        } else {
            showErr('Invalid room code');
        }
    };

    const placeBid = (inc: number) => {
        if (!user) return;
        if (!joined) {
            showErr('Enter room code to join the auction');
            return;
        }
        if (!auctionState.running) {
            showErr('Bidding opens only when timer is running');
            return;
        }
        if (isTop1Bidder(bidders, user.id)) {
            showErr("You're currently the highest bidder");
            return;
        }
        setAuctionState(prev => {
            const myPrev = prev.bidders.find(b => b.userId === user.id)?.loss || 0;
            const me: Bidder = { userId: user.id, name: user.name, loss: myPrev + inc };
            const others = prev.bidders.filter(b => b.userId !== user.id);
            const updated = [me, ...others].sort((a, b) => b.loss - a.loss).slice(0, 3);
            const nextCurrentLoss = prev.currentLoss + inc;
            return { ...prev, bidders: updated, currentLoss: nextCurrentLoss };
        });
    };

    if (!joined) {
        return (
            <div className="max-w-md mx-auto mt-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                        <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Enter Auction Room</h2>
                    <p className="text-slate-500 mb-8">Please enter the room code provided by the admin to join the live auction.</p>

                    <div className="space-y-4">
                        <input
                            type="text"
                            value={roomInput}
                            onChange={(e) => setRoomInput(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-center text-lg tracking-widest font-mono uppercase"
                            placeholder="GK-XXXXXX"
                        />
                        <button
                            onClick={tryJoin}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-200"
                        >
                            Join Room
                        </button>
                        {err && (
                            <div className="flex items-center justify-center gap-2 text-red-500 text-sm bg-red-50 py-2 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                {err}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            {/* Header Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                            Live Auction Room
                        </h2>
                        <p className="text-slate-500 text-sm mt-1 ml-4">Participate in real-time bidding</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Chit Value</div>
                            <div className="text-2xl font-bold text-indigo-600">₹{formatINR(chitValue)}</div>
                        </div>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div className="text-right">
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Date</div>
                            <div className="text-lg font-bold text-slate-700">{dateMonth}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-6 border-t border-slate-100">
                    <InfoPill label="Start Month" value={auctionConfig.startMonth} />
                    <InfoPill label="End Month" value={auctionConfig.endMonth} />
                    <InfoPill label="Running Month" value={auctionConfig.runningMonth} />
                    <InfoPill label="Term" value={`${auctionConfig.term} Months`} />
                    <InfoPill label="Min Loss" value={`₹${formatINR(auctionConfig.minLoss)}`} />
                    <InfoPill label="Joined Users" value={String(joinedUsers)} />
                </div>
            </div>

            {/* Marquee */}
            <div className="bg-indigo-900 text-white rounded-xl overflow-hidden shadow-md">
                <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] py-3 px-4 text-sm font-medium flex items-center gap-4">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">LIVE</span>
                    {ticker}
                </div>
            </div>

            {/* Main Auction Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timer Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    <div className="mb-8 text-center">
                        <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 justify-center mb-2">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            Time Remaining
                        </h3>
                        <p className="text-slate-400 text-sm">Bidding closes when timer hits zero</p>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative h-64 w-64 rounded-full bg-white border-8 border-indigo-50 shadow-2xl flex items-center justify-center">
                            <TimerDigits />
                        </div>
                    </div>

                    {auctionState.finished && auctionState.winner && (
                        <div className="w-full bg-emerald-50 border border-emerald-100 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4">
                            <div className="text-center mb-3">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Auction Completed</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="text-slate-500 text-xs">Winner</div>
                                    <div className="font-bold text-emerald-900 text-lg">{auctionState.winner.name}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-slate-500 text-xs">Winning Bid</div>
                                    <div className="font-bold text-emerald-900 text-lg">₹{formatINR(auctionState.winner.winnerLoss)}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Leaderboard Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        Live Board
                    </h3>

                    <div className="space-y-4 flex-1">
                        <BoardItem label="Current Loss" value={`₹${formatINR(currentLossDisplay)}`} highlight />
                        <BoardItem label="In Hand Amount" value={`₹${formatINR(inHandDisplay)}`} />

                        <div className="my-6 border-t border-slate-100"></div>

                        <div className="space-y-3">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Top Bidders</div>
                            <BoardItem label="1st Position" value={`${bidders[0]?.name || '—'} / ₹${formatINR(bidders[0]?.loss || 0)}`} />
                            <BoardItem label="2nd Position" value={`${bidders[1]?.name || '—'} / ₹${formatINR(bidders[1]?.loss || 0)}`} />
                            <BoardItem label="3rd Position" value={`${bidders[2]?.name || '—'} / ₹${formatINR(bidders[2]?.loss || 0)}`} />
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-400">
                        *Values are updated in real-time by the admin
                    </p>
                </div>
            </div>

            {/* Bidding Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Place Your Bid</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {[100, 250, 500, 800, 1000, 1500, 2000, 5000].map((inc) => (
                        <button
                            key={inc}
                            onClick={() => placeBid(inc)}
                            disabled={!joined || !auctionState.running}
                            className={`rounded-xl border px-2 py-3 font-bold text-sm transition-all transform active:scale-95 ${joined && auctionState.running
                                    ? 'bg-white border-slate-200 text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 shadow-sm hover:shadow-md'
                                    : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                                }`}
                        >
                            +₹{inc}
                        </button>
                    ))}
                </div>
            </div>

            {err && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="font-medium">{err}</span>
                </div>
            )}
        </section>
    );
}

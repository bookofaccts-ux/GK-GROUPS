import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { formatINR, isTop1Bidder } from '../utils/helpers';
import { InfoPill, BoardItem } from '../components/ui/Atoms';
import { TimerDigits } from '../components/TimerDigits';
import { PleaseLogin } from '../components/PleaseLogin';
import type { Bidder } from '../types';

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

    if (!user) {
        return <PleaseLogin />;
    }

    return (
        <section className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold">Chit Funds</h2>
                    <button onClick={() => navigate(-1)} className="text-sm rounded-full border px-3 py-1">
                        ← Back
                    </button>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 text-sm">
                    <InfoPill label="User" value={user.name} />
                    <InfoPill label="User ID" value={user.id} />
                    <InfoPill label="Date & Month" value={dateMonth} />
                    <InfoPill label="Chit Start" value={auctionConfig.startMonth} />
                    <InfoPill label="Chit End" value={auctionConfig.endMonth} />
                    <InfoPill label="Running Month" value={auctionConfig.runningMonth} />
                    <InfoPill label="Term (months)" value={String(auctionConfig.term)} />
                    <InfoPill label="Chit Value" value={`₹${formatINR(chitValue)}`} />
                    <InfoPill label="Last Bid" value={`₹${formatINR(auctionConfig.lastBid)}`} />
                    <InfoPill label={`Minimum Loss (${auctionConfig.commissionRate}%)`} value={`₹${formatINR(auctionConfig.minLoss)}`} />
                    <InfoPill label="No. of users Joined" value={String(joinedUsers)} />
                </div>

                {/* Room join */}
                <div className="mt-3 rounded-xl border bg-white p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm">
                        <b>Enter Auction Room Code</b> (provided by Admin):
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            value={roomInput}
                            onChange={(e) => setRoomInput(e.target.value)}
                            className="rounded-lg border px-3 py-2 text-sm"
                            placeholder="e.g. GK-123456"
                        />
                        <button onClick={tryJoin} className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50">
                            Join
                        </button>
                        {joined && <span className="text-xs text-emerald-700">Joined</span>}
                    </div>
                </div>

                {/* Marquee */}
                <div className="mt-3 rounded-xl border bg-white overflow-hidden">
                    <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] py-2 px-3 text-sm">
                        {ticker}
                    </div>
                </div>

                {/* 70:30 layout */}
                <div className="mt-6 grid grid-cols-10 gap-6 items-stretch">
                    <div className="col-span-10 lg:col-span-7">
                        <div className="h-full rounded-3xl border bg-amber-50/60 shadow-inner p-6 flex flex-col">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">Timer</h3>
                                <div className="text-xs text-slate-500">10:00 → 00:00</div>
                            </div>
                            <div className="mt-6 flex-1 flex items-center justify-center">
                                <div className="h-56 w-56 rounded-full bg-white border-8 border-amber-200 shadow flex items-center justify-center">
                                    <TimerDigits />
                                </div>
                            </div>
                            <p className="mt-2 text-center text-xs text-slate-500">
                                Auction status is controlled by Admin.
                            </p>
                            {auctionState.finished && auctionState.winner && (
                                <div className="mt-4 rounded-xl border bg-white p-3 text-sm">
                                    <div className="font-semibold mb-1">Last Auction Result</div>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        <div><b>Winner:</b> {auctionState.winner.name}</div>
                                        <div><b>Winner Loss:</b> ₹{formatINR(auctionState.winner.winnerLoss)}</div>
                                        <div><b>Month Loss (incl. commission):</b> ₹{formatINR(auctionState.winner.finalLoss)}</div>
                                        <div><b>Month In Hand:</b> ₹{formatINR(auctionState.winner.monthInHand)}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-span-10 lg:col-span-3">
                        <div className="h-full rounded-3xl border bg-white p-4 overflow-y-auto">
                            <h3 className="text-sm font-semibold text-slate-700">Auction Board</h3>
                            <BoardItem label="Current Loss" value={`₹${formatINR(currentLossDisplay)}`} highlight />
                            <BoardItem label="IN Hand" value={`₹${formatINR(inHandDisplay)}`} />
                            <BoardItem label="Bidder (1st)" value={`${bidders[0]?.name || '—'} / ₹${formatINR(bidders[0]?.loss || 0)}`} />
                            <BoardItem label="Bidder (2nd)" value={`${bidders[1]?.name || '—'} / ₹${formatINR(bidders[1]?.loss || 0)}`} />
                            <BoardItem label="Bidder (3rd)" value={`${bidders[2]?.name || '—'} / ₹${formatINR(bidders[2]?.loss || 0)}`} />
                            <p className="mt-3 text-[11px] text-slate-500">
                                User cannot edit any values here. (All values are controlled by Developer Admin.)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bid buttons */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[100, 250, 500, 800, 1000, 1500, 2000, 5000].map((inc) => (
                        <button
                            key={inc}
                            onClick={() => placeBid(inc)}
                            disabled={!joined || !auctionState.running}
                            className={`rounded-xl border px-4 py-3 font-semibold ${joined && auctionState.running
                                ? 'bg-white hover:bg-slate-50'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            +₹{inc}
                        </button>
                    ))}
                </div>
                {err && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2 inline-block">
                        {err}
                    </div>
                )}
            </div>
        </section>
    );
}

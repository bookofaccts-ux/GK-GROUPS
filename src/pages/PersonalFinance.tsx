import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { formatINR } from '../utils/helpers';
import { DEMO_USERS } from '../data/mockData';
import { PleaseLogin } from '../components/PleaseLogin';
import type { UserFinance } from '../types';

export function PersonalFinance() {
    const navigate = useNavigate();
    const { user, pfLive, auctionConfig } = useGlobal();
    const [data, setData] = useState<UserFinance | null>(null);

    useEffect(() => {
        if (!user) return;
        const key = user.id.replace('-', '_') as keyof typeof DEMO_USERS;
        const rec = DEMO_USERS[key] || DEMO_USERS['GK2025_0012'];
        setData(rec);
    }, [user]);

    if (!user) {
        return <PleaseLogin />;
    }

    const live = pfLive[user.id] || null;
    const basicMonthly = auctionConfig.chitValue / auctionConfig.term;
    const commissionRate = auctionConfig.commissionRate;

    return (
        <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold">Personal Finance</h2>
                    <button onClick={() => navigate(-1)} className="text-sm rounded-full border px-3 py-1">
                        ← Back
                    </button>
                </div>
                {data && (
                    <div className="mt-8 grid gap-6">
                        <div className="rounded-xl border bg-white p-5">
                            <h3 className="font-semibold text-lg mb-3">Personal Details</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                <div><b>User ID:</b> {data.personal.userId}</div>
                                <div><b>Contact number:</b> {data.personal.contact}</div>
                                <div><b>Alternative number:</b> {data.personal.altContact}</div>
                                <div className="sm:col-span-2 lg:col-span-3"><b>Home address:</b> {data.personal.home}</div>
                                <div className="sm:col-span-2 lg:col-span-3"><b>Office address:</b> {data.personal.office}</div>
                            </div>
                        </div>

                        {live && (
                            <div className="rounded-xl border bg-emerald-50 p-5">
                                <h3 className="font-semibold text-lg mb-1">Last Auction Result</h3>
                                <p className="text-xs text-slate-600 mb-3">
                                    Basic monthly payment (calc): ₹{formatINR(Math.round(basicMonthly))} • Actual Month Pay is set by Admin after auction
                                </p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                    <div><b>Name of user:</b> {live.name}</div>
                                    <div><b>Chit value:</b> ₹{formatINR(live.chitValue)}</div>
                                    <div><b>Month loss:</b> ₹{formatINR(live.monthLoss)}</div>
                                    <div><b>Month In hand:</b> ₹{formatINR(live.monthInHand)}</div>
                                    <div><b>Monthly payment (Admin):</b> ₹{formatINR(live.monthlyPayment)}</div>
                                    <div><b>Running month:</b> {live.runningMonth}</div>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-4">
                            {data.chits.map((c) => {
                                const bidAmount = Math.max(c.value - (c.loss || 0) - Math.floor(c.value * (commissionRate / 100)), 0);
                                return (
                                    <div key={c.id} className="rounded-xl border bg-white p-5">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-lg">Chit — {c.id}</h3>
                                            <span className={`${c.taken ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'} text-xs px-2 py-1 rounded-full`}>
                                                {c.taken ? 'Taken' : 'Not taken'}
                                            </span>
                                        </div>
                                        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                            <div><b>Chit value:</b> ₹{formatINR(c.value)}</div>
                                            <div><b>Paid months:</b> {c.paid}</div>
                                            <div><b>Remaining months:</b> {c.remaining}</div>
                                            <div><b>Start date:</b> {c.joinedOn}</div>
                                            {c.taken && (
                                                <>
                                                    <div><b>Taken month:</b> {c.monthTaken}</div>
                                                    <div><b>Loss:</b> ₹{formatINR(c.loss)}</div>
                                                    <div><b>Bid amount (Value − (Loss + {commissionRate}%)):</b> ₹{formatINR(bidAmount)}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="rounded-xl border bg-white p-5">
                            <h3 className="font-semibold text-lg mb-3">Personal Loans</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                <div><b>Name:</b> {data.loans.name}</div>
                                <div><b>Loan amount:</b> ₹{formatINR(data.loans.loanAmount)}</div>
                                <div><b>Loan taken date:</b> {data.loans.takenDate}</div>
                                <div><b>Loan expiry:</b> {data.loans.expiry}</div>
                                <div><b>Interest %:</b> {data.loans.interest}%</div>
                                <div><b>Interest per month:</b> ₹{formatINR(data.loans.perMonth)}</div>
                                <div><b>Paid interest:</b> ₹{formatINR(data.loans.paidInterest)}</div>
                                <div><b>Paid principal:</b> ₹{formatINR(data.loans.paidPrincipal)}</div>
                                <div><b>Balance:</b> ₹{formatINR(data.loans.balance)}</div>
                                <div><b>Extra charges & Fines:</b> ₹{formatINR(data.loans.fines)}</div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-white p-5">
                            <h3 className="font-semibold text-lg mb-3">Personal Credit on Interest</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                <div><b>Name:</b> {data.credits.name}</div>
                                <div><b>Amount:</b> ₹{formatINR(data.credits.amount)}</div>
                                <div><b>Given on:</b> {data.credits.givenOn}</div>
                                <div><b>Expiry:</b> {data.credits.expiry}</div>
                                <div><b>Interest %:</b> {data.credits.interest}%</div>
                                <div><b>Interest received:</b> ₹{formatINR(data.credits.interestReceived)}</div>
                                <div><b>Principal received:</b> ₹{formatINR(data.credits.principalReceived)}</div>
                                <div><b>Balance:</b> ₹{formatINR(data.credits.balance)}</div>
                                <div><b>Other dues:</b> ₹{formatINR(data.credits.otherDues)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

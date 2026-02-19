import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import {
    Wallet,
    TrendingUp,
    CreditCard,
    Bell,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Shield,
    PieChart
} from 'lucide-react';

export function Dashboard() {
    const { user } = useGlobal();

    // Mock Data for Dashboard
    const stats = [
        {
            label: 'Total Chit Value',
            value: '₹ 5,00,000',
            change: '+12%',
            isPositive: true,
            icon: PieChart,
            color: 'bg-blue-500'
        },
        {
            label: 'Outstanding Loans',
            value: '₹ 1,20,000',
            change: '-5%',
            isPositive: true,
            icon: CreditCard,
            color: 'bg-orange-500'
        },
        {
            label: 'Wallet Balance',
            value: '₹ 25,400',
            change: '+2.5%',
            isPositive: true,
            icon: Wallet,
            color: 'bg-green-500'
        },
        {
            label: 'Investment Growth',
            value: '₹ 85,000',
            change: '+18%',
            isPositive: true,
            icon: TrendingUp,
            color: 'bg-purple-500'
        },
    ];

    const recentActivity = [
        { id: 1, title: 'Chit Payment', date: 'Today, 10:30 AM', amount: '- ₹ 5,000', type: 'debit', status: 'Success' },
        { id: 2, title: 'Loan Disbursement', date: 'Yesterday, 2:15 PM', amount: '+ ₹ 50,000', type: 'credit', status: 'Success' },
        { id: 3, title: 'Dividend Received', date: 'Nov 26, 2025', amount: '+ ₹ 1,200', type: 'credit', status: 'Success' },
        { id: 4, title: 'Insurance Premium', date: 'Nov 24, 2025', amount: '- ₹ 2,500', type: 'debit', status: 'Pending' },
    ];

    const notifications = [
        { id: 1, title: 'Auction Alert', message: 'Chit Group A1 Auction starts in 2 hours.', time: '2h ago', isNew: true },
        { id: 2, title: 'Payment Due', message: 'Your personal loan EMI is due on Dec 5th.', time: '5h ago', isNew: true },
        { id: 3, title: 'New Offer', message: 'Pre-approved for Gold Loan up to ₹ 2 Lakhs.', time: '1d ago', isNew: false },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">
                        Good Morning, <span className="text-indigo-600">{user?.name || 'Guest'}</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Here's what's happening with your finances today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        + Add Funds
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-${stat.color.replace('bg-', '')} group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color.replace('bg-', '')}-600`} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-bold mb-1">{stat.label}</h3>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-indigo-500" />
                            Recent Activity
                        </h2>
                        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {activity.type === 'credit' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{activity.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{activity.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black ${activity.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>{activity.amount}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activity.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {activity.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications / Quick Actions */}
                <div className="space-y-8">
                    {/* Notifications Widget */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-orange-500" />
                                Alerts
                            </h2>
                            <button className="text-xs font-bold text-slate-400 hover:text-slate-600">Mark all read</button>
                        </div>
                        <div className="space-y-4">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="relative pl-4 border-l-2 border-slate-100 hover:border-indigo-500 transition-colors">
                                    {notif.isNew && <span className="absolute -left-[5px] top-0 w-2 h-2 bg-red-500 rounded-full"></span>}
                                    <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                                    <span className="text-[10px] text-slate-400 font-bold mt-2 block">{notif.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Tip */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <Shield className="w-8 h-8 text-green-400 mb-4 relative z-10" />
                        <h3 className="font-bold text-lg relative z-10">Security Tip</h3>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed relative z-10">
                            Never share your OTP or password with anyone. GK Finserv staff will never ask for these details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

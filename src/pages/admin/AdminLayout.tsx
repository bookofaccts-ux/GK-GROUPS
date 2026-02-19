import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { useState } from 'react';
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
    MessageSquare,
    LogOut,
    ExternalLink,
    Menu,
    X
} from 'lucide-react';

export function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { adminUser, setAdminUser } = useGlobal();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const onLogout = () => {
        setAdminUser(null);
        navigate('/admin');
    };

    const onExit = () => {
        setAdminUser(null);
        navigate('/');
    };

    if (!adminUser) {
        navigate('/admin');
        return null;
    }

    const tabs = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'User Home Page', path: '/admin/cms', icon: Layers },
        { name: 'Live Chit Funds', path: '/admin/auction', icon: Gavel },
        { name: 'Chit Funds', path: '/admin/chits', icon: Banknote },
        { name: 'Personal Loans', path: '/admin/loans', icon: Banknote },
        { name: 'Personal Interests', path: '/admin/deposits', icon: Percent },
        { name: 'Credit Cards', path: '/admin/cards', icon: CreditCard },
        { name: 'Forex Conversions', path: '/admin/forex', icon: RefreshCcw },
        { name: 'Stock Markets', path: '/admin/stocks', icon: TrendingUp },
        { name: 'Users & Login Data', path: '/admin/users', icon: Users },
        { name: 'Messages / Requests', path: '/admin/messages', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col shrink-0
            `}>
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-900/20">
                            GK
                        </div>
                        <div>
                            <div className="font-bold text-lg tracking-tight">GK Admin</div>
                            <div className="text-xs text-slate-400">Control Panel</div>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path;
                        return (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 font-bold'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
                                    }`}
                            >
                                <tab.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                <span>{tab.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs">
                                {adminUser.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm">{adminUser.name}</div>
                                <div className="text-xs text-emerald-400">{adminUser.role}</div>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-red-600/20 hover:text-red-400 text-slate-400 rounded-lg text-xs font-bold transition-all"
                        >
                            <LogOut className="w-3 h-3" /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shadow-sm z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="md:hidden font-bold text-slate-900">GK Admin</div>

                        {/* Breadcrumbs or Page Title */}
                        <h1 className="hidden md:block text-lg font-bold text-slate-700 ml-4">
                            {tabs.find(t => t.path === location.pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                            onClick={onExit}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden md:inline">Exit to Site</span>
                            <span className="md:hidden">Exit</span>
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto pb-20">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

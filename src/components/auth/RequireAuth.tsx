import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { Lock } from 'lucide-react';

export function RequireAuth({ children }: { children: React.JSX.Element }) {
    const { user, setShowLoginModal } = useGlobal();
    const location = useLocation();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Lock className="w-10 h-10 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Login Required</h2>
                <p className="text-slate-500 max-w-md mb-8 text-lg">
                    Please login to access this premium service.
                </p>
                <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transform hover:-translate-y-1 transition-all"
                >
                    Open Login
                </button>
            </div>
        );
    }

    return children;
}

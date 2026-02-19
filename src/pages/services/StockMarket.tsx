import React from 'react';
import { TrendingUp, Construction } from 'lucide-react';

export function StockMarket() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                <Construction className="w-10 h-10 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Stock Market Analysis</h1>
            <p className="text-lg text-slate-500 max-w-md mb-8">
                We are building a comprehensive stock analysis platform. This feature will be available soon.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Coming Soon</span>
            </div>
        </div>
    );
}

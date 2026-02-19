import React from 'react';

interface InfoPillProps {
    label: string;
    value: React.ReactNode;
}

export function InfoPill({ label, value }: InfoPillProps) {
    return (
        <div className="rounded-xl border bg-white px-3 py-2">
            <div className="text-[11px] text-slate-500">{label}</div>
            <div className="text-sm font-semibold">{value}</div>
        </div>
    );
}

interface BoardItemProps {
    label: string;
    value: React.ReactNode;
    highlight?: boolean;
}

export function BoardItem({ label, value, highlight }: BoardItemProps) {
    return (
        <div className={`mt-3 rounded-xl p-3 border ${highlight ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50'}`}>
            <div className="text-[11px] text-slate-500">{label}</div>
            <div className="text-sm font-semibold">{value}</div>
        </div>
    );
}

import { useState } from 'react';
import type { UserLite } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface UserLoginModalProps {
    onClose: () => void;
    onLogin: (u: UserLite) => void;
}

export function UserLoginModal({ onClose, onLogin }: UserLoginModalProps) {
    const [uid, setUid] = useState('GK2025-0012');
    const [name, setName] = useState('Ravi Kumar');

    const quick = (key: 'GK2025_0012' | 'U_2') => {
        const d = DEMO_USERS[key].personal;
        setUid(d.userId);
        setName(d.name || 'User');
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-sm rounded-xl bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">User Login</h3>
                    <button className="text-sm" onClick={onClose}>✕</button>
                </div>
                <div className="space-y-2 text-sm">
                    <label className="flex items-center justify-between gap-2">
                        User ID
                        <input
                            className="rounded-lg border px-2 py-1"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                        />
                    </label>
                    <label className="flex items-center justify-between gap-2">
                        Name
                        <input
                            className="rounded-lg border px-2 py-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <div className="flex gap-2 text-xs">
                        <button className="rounded-lg border px-2 py-1" onClick={() => quick('GK2025_0012')}>
                            Use Ravi
                        </button>
                        <button className="rounded-lg border px-2 py-1" onClick={() => quick('U_2')}>
                            Use Anita
                        </button>
                    </div>
                    <button
                        className="w-full rounded-lg bg-emerald-600 text-white px-3 py-2"
                        onClick={() => onLogin({ id: uid, name })}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

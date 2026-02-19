import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AdminUser } from '../../types';

interface AdminLoginProps {
    onSuccess: (u: AdminUser) => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('owner@gk.local');
    const [password, setPassword] = useState('');

    const login = () => {
        if (email && password) {
            onSuccess({ id: 'admin', name: 'Owner', email, role: 'Owner' });
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl border">
            <h2 className="text-lg font-bold mb-4">Admin Login</h2>
            <div className="space-y-3 text-sm">
                <input
                    className="w-full border rounded px-2 py-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="w-full border rounded px-2 py-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={login} className="w-full rounded bg-emerald-600 text-white py-2">
                    Login
                </button>
            </div>
        </div>
    );
}

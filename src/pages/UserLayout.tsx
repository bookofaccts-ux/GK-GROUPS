import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UserLoginModal } from '../components/UserLoginModal';

export function UserLayout() {
    const [showLogin, setShowLogin] = useState(false);
    const { user, setUser } = useGlobal();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
            <Header
                user={user}
                onLogin={() => setShowLogin(true)}
                onLogout={() => setUser(null)}
            />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            {showLogin && (
                <UserLoginModal
                    onClose={() => setShowLogin(false)}
                    onLogin={(u) => {
                        setUser(u);
                        setShowLogin(false);
                    }}
                />
            )}
        </div>
    );
}

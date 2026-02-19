import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { ChitFunds } from './pages/services/ChitFunds';
import { PersonalLoans } from './pages/services/PersonalLoans';
import { CreditCards } from './pages/services/CreditCards';
import { StockMarket } from './pages/services/StockMarket';
import { Forex } from './pages/services/Forex';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { RequireAuth } from './components/auth/RequireAuth';

// Admin imports
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers, AdminChits } from './pages/admin/AdminPages';
import { AdminAuction } from './pages/admin/AdminAuction';
import { AdminCMS } from './pages/admin/AdminCMS';
import { useGlobal } from './context/GlobalContext';

function AdminRoutes() {
  const { setAdminUser } = useGlobal();

  return (
    <Routes>
      <Route path="/" element={<AdminLogin onSuccess={setAdminUser} />} />
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="cms" element={<AdminCMS />} />
        <Route path="auction" element={<AdminAuction />} />
        <Route path="chits" element={<AdminChits />} />
        <Route path="loans" element={<AdminUsers />} /> {/* Reusing AdminUsers for now, will split later */}
        <Route path="deposits" element={<AdminUsers />} /> {/* Reusing AdminUsers for now */}
        <Route path="cards" element={<div className="p-4 bg-white rounded-xl shadow">Credit Cards Management (Coming Soon)</div>} />
        <Route path="forex" element={<div className="p-4 bg-white rounded-xl shadow">Forex Conversions (Coming Soon)</div>} />
        <Route path="stocks" element={<div className="p-4 bg-white rounded-xl shadow">Stock Markets (Coming Soon)</div>} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="messages" element={<div className="p-4 bg-white rounded-xl shadow">Messages & Requests (Coming Soon)</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Main Site Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {/* Protected Service Routes */}
            <Route path="/chits" element={<RequireAuth><ChitFunds /></RequireAuth>} />
            <Route path="/loans" element={<RequireAuth><PersonalLoans /></RequireAuth>} />
            <Route path="/credit-cards" element={<RequireAuth><CreditCards /></RequireAuth>} />
            <Route path="/stocks" element={<RequireAuth><StockMarket /></RequireAuth>} />
            <Route path="/forex" element={<RequireAuth><Forex /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

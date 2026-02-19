import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { AdminTable } from '../../components/admin/AdminTable';
import { AdminModal } from '../../components/admin/AdminModal';
import { Plus } from 'lucide-react';
import type { UserLite, ChitBatch, UserFinance, UserLoan, UserChit, UserDeposit } from '../../types';

export function AdminUsers() {
    const { allUsers, addUser, updateUser, deleteUser, allUserFinances, updateUserFinance, batches } = useGlobal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserLite | null>(null);
    const [formData, setFormData] = useState<UserLite>({ id: '', name: '', services: [] });
    const [financeData, setFinanceData] = useState<UserFinance>({ chits: [], loans: [], deposits: [] });
    const [activeTab, setActiveTab] = useState<'Profile' | 'Chits' | 'Loans' | 'Deposits'>('Profile');

    const availableServices = ['Chits', 'Loans', 'Cards', 'Stocks', 'Forex'];

    const handleEdit = (user: UserLite) => {
        setEditingUser(user);
        setFormData(user);
        // Load finance data or default
        setFinanceData(allUserFinances[user.id] || { chits: [], loans: [], deposits: [] });
        setIsModalOpen(true);
        setActiveTab('Profile');
    };

    const handleDelete = (user: UserLite) => {
        if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
            deleteUser(user.id);
        }
    };

    const handleSubmit = () => {
        if (!formData.id || !formData.name) {
            alert("User ID and Name are required!");
            return;
        }

        if (editingUser) {
            updateUser(editingUser.id, formData);
            updateUserFinance(editingUser.id, financeData);
        } else {
            // Check if ID exists
            if (allUsers.find(u => u.id === formData.id)) {
                alert("User ID already exists!");
                return;
            }
            addUser(formData);
            updateUserFinance(formData.id, financeData);
        }
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ id: '', name: '', services: [] });
    };

    const openAdd = () => {
        setEditingUser(null);
        setFormData({ id: '', name: '', services: [] });
        setFinanceData({ chits: [], loans: [], deposits: [] });
        setIsModalOpen(true);
        setActiveTab('Profile');
    };

    const toggleService = (service: string) => {
        setFormData(prev => {
            const services = prev.services || [];
            if (services.includes(service)) {
                return { ...prev, services: services.filter(s => s !== service) };
            } else {
                return { ...prev, services: [...services, service] };
            }
        });
    };

    // Helper to update a loan in the list
    const updateLoan = (idx: number, field: string, val: any) => {
        const newLoans = [...financeData.loans];
        newLoans[idx] = { ...newLoans[idx], [field]: val };
        setFinanceData({ ...financeData, loans: newLoans });
    };

    // Helper to add a mock loan
    const addMockLoan = () => {
        const newLoan: UserLoan = {
            id: `LN-${Date.now()}`,
            type: 'Personal',
            amount: 100000,
            date: new Date().toLocaleDateString(),
            interestRate: 2, // 2% per month default
            status: 'Active',
            pendingPrincipal: 100000,
            interestPaid: 0,
            principalPaid: 0,
            totalPending: 100000,
            monthlyInterest: 2000,
            nextDueDate: new Date().toLocaleDateString()
        };
        setFinanceData({ ...financeData, loans: [...financeData.loans, newLoan] });
    };

    // --- CHITS HELPERS ---
    const assignBatch = (batchId: string) => {
        const batch = batches.find(b => b.id === batchId);
        if (!batch) return;
        const newChit: import('../../types').UserChit = {
            batchId: batch.id,
            batchName: batch.name,
            value: batch.value,
            term: 20, // Default term
            status: 'Active',
            bidWon: false,
            totalPaid: 0,
            pendingAmount: batch.value,
            installmentsPaid: 0,
            history: [],
            currentMonthPayment: batch.subscription,
            currentMonthDividend: batch.dividend
        };
        setFinanceData({ ...financeData, chits: [...financeData.chits, newChit] });
    };

    const updateChit = (idx: number, field: string, val: any) => {
        const newChits = [...financeData.chits];
        newChits[idx] = { ...newChits[idx], [field]: val };
        setFinanceData({ ...financeData, chits: newChits });
    };

    // --- DEPOSITS HELPERS ---
    const addDeposit = () => {
        const newDep: import('../../types').UserDeposit = {
            id: `FD-${Date.now()}`,
            amount: 50000,
            interestRate: 1.5, // 1.5% per month
            date: new Date().toLocaleDateString(),
            interestEarned: 0,
            maturityDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
            status: 'Active',
            monthlyPayout: 750
        };
        setFinanceData({ ...financeData, deposits: [...financeData.deposits, newDep] });
    };

    const updateDeposit = (idx: number, field: string, val: any) => {
        const newDeps = [...financeData.deposits];
        newDeps[idx] = { ...newDeps[idx], [field]: val };
        setFinanceData({ ...financeData, deposits: newDeps });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-4 h-4" /> Add User
                </button>
            </div>

            <AdminTable
                data={allUsers}
                keyField="id"
                columns={[
                    { header: 'User ID', accessor: 'id', className: 'font-mono text-xs' },
                    { header: 'Name', accessor: 'name', className: 'font-bold' },
                    {
                        header: 'Services', accessor: (u) => (
                            <div className="flex gap-1 flex-wrap">
                                {u.services?.map(s => (
                                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        )
                    },
                ]}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? `Edit User: ${editingUser.name}` : 'Add New User'}
                onSubmit={handleSubmit}
            >
                <div className="flex gap-2 mb-4 border-b border-slate-200 pb-2">
                    {['Profile', 'Chits', 'Loans', 'Deposits'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-3 py-1 rounded-md text-sm font-bold transition-colors ${activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {activeTab === 'Profile' && (
                        <div className="space-y-6">
                            {/* Personal Details */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">Personal Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">User ID *</label>
                                        <input
                                            value={formData.id}
                                            onChange={e => setFormData({ ...formData, id: e.target.value })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="e.g. GK-001"
                                            disabled={!!editingUser}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Name *</label>
                                        <input
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Phone</label>
                                        <input
                                            value={formData.phone || ''}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Alt Phone</label>
                                        <input
                                            value={formData.altPhone || ''}
                                            onChange={e => setFormData({ ...formData, altPhone: e.target.value })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Alternative Phone"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                                        <input
                                            value={formData.email || ''}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Address</label>
                                        <textarea
                                            value={formData.address || ''}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Full Home Address"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">Bank Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Account Number</label>
                                        <input
                                            value={formData.bankDetails?.accountNumber || ''}
                                            onChange={e => setFormData({ ...formData, bankDetails: { ...(formData.bankDetails || { accountNumber: '', ifsc: '', bankName: '' }), accountNumber: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Account Number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">IFSC Code</label>
                                        <input
                                            value={formData.bankDetails?.ifsc || ''}
                                            onChange={e => setFormData({ ...formData, bankDetails: { ...(formData.bankDetails || { accountNumber: '', ifsc: '', bankName: '' }), ifsc: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="IFSC Code"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Bank Name</label>
                                        <input
                                            value={formData.bankDetails?.bankName || ''}
                                            onChange={e => setFormData({ ...formData, bankDetails: { ...(formData.bankDetails || { accountNumber: '', ifsc: '', bankName: '' }), bankName: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Bank Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Branch</label>
                                        <input
                                            value={formData.bankDetails?.branch || ''}
                                            onChange={e => setFormData({ ...formData, bankDetails: { ...(formData.bankDetails || { accountNumber: '', ifsc: '', bankName: '' }), branch: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Branch Name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Surity Details */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">Surity Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Surity Name</label>
                                        <input
                                            value={formData.surity?.name || ''}
                                            onChange={e => setFormData({ ...formData, surity: { ...(formData.surity || { name: '', phone: '', address: '' }), name: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Surity Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Surity Phone</label>
                                        <input
                                            value={formData.surity?.phone || ''}
                                            onChange={e => setFormData({ ...formData, surity: { ...(formData.surity || { name: '', phone: '', address: '' }), phone: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Surity Phone"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Surity Address</label>
                                        <input
                                            value={formData.surity?.address || ''}
                                            onChange={e => setFormData({ ...formData, surity: { ...(formData.surity || { name: '', phone: '', address: '' }), address: e.target.value } })}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="Surity Address"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Access Permissions */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">Access Permissions</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableServices.map(service => (
                                        <label key={service} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-slate-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.services?.includes(service) || false}
                                                onChange={() => toggleService(service)}
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <span className="text-sm font-medium text-slate-700">{service}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Loans' && (
                        <div className="space-y-4">
                            {financeData.loans.map((loan, idx) => (
                                <div key={idx} className="p-4 border rounded-xl bg-slate-50 space-y-3 relative group">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-xs text-slate-500 uppercase tracking-wider">{loan.id}</span>
                                        <select
                                            value={loan.status}
                                            onChange={e => updateLoan(idx, 'status', e.target.value)}
                                            className="text-xs bg-white border border-slate-200 px-2 py-1 rounded font-bold text-slate-700"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Amount</label>
                                            <input
                                                type="number"
                                                value={loan.amount}
                                                onChange={e => updateLoan(idx, 'amount', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Int. Rate (%)</label>
                                            <input
                                                type="number"
                                                value={loan.interestRate}
                                                onChange={e => updateLoan(idx, 'interestRate', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Monthly Int.</label>
                                            <input
                                                type="number"
                                                value={loan.monthlyInterest || 0}
                                                onChange={e => updateLoan(idx, 'monthlyInterest', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Start Date</label>
                                            <input
                                                type="text"
                                                value={loan.date}
                                                onChange={e => updateLoan(idx, 'date', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Next Due</label>
                                            <input
                                                type="text"
                                                value={loan.nextDueDate || ''}
                                                onChange={e => updateLoan(idx, 'nextDueDate', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Total Pending</label>
                                            <input
                                                type="number"
                                                value={loan.totalPending}
                                                onChange={e => updateLoan(idx, 'totalPending', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-red-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {financeData.loans.length === 0 && <div className="text-center text-slate-400 py-4">No active loans</div>}
                            <button
                                onClick={addMockLoan}
                                className="w-full py-2 border border-dashed border-indigo-300 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50"
                            >
                                + Add Loan
                            </button>
                        </div>
                    )}

                    {activeTab === 'Chits' && (
                        <div className="space-y-4">
                            {financeData.chits.map((chit, idx) => (
                                <div key={idx} className="p-4 border rounded-xl bg-slate-50 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm text-slate-700">{chit.batchName}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${chit.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100'}`}>{chit.status}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Paid (₹)</label>
                                            <input
                                                type="number"
                                                value={chit.totalPaid}
                                                onChange={e => updateChit(idx, 'totalPaid', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-emerald-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Pending (₹)</label>
                                            <input
                                                type="number"
                                                value={chit.pendingAmount}
                                                onChange={e => updateChit(idx, 'pendingAmount', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-red-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Installments</label>
                                            <input
                                                type="number"
                                                value={chit.installmentsPaid}
                                                onChange={e => updateChit(idx, 'installmentsPaid', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">This Month (₹)</label>
                                            <input
                                                type="number"
                                                value={chit.currentMonthPayment || 0}
                                                onChange={e => updateChit(idx, 'currentMonthPayment', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Dividend (₹)</label>
                                            <input
                                                type="number"
                                                value={chit.currentMonthDividend || 0}
                                                onChange={e => updateChit(idx, 'currentMonthDividend', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {financeData.chits.length === 0 && <div className="text-center text-slate-400 py-4">No active chits</div>}

                            <div className="pt-2 border-t border-slate-100">
                                <label className="block text-xs font-bold text-slate-500 mb-1">Assign to Batch</label>
                                <select
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            assignBatch(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                >
                                    <option value="">Select Batch...</option>
                                    {batches.map(b => (
                                        <option key={b.id} value={b.id}>{b.name} ({b.currentMonth})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Deposits' && (
                        <div className="space-y-4">
                            {financeData.deposits.map((dep, idx) => (
                                <div key={idx} className="p-4 border rounded-xl bg-slate-50 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-xs text-slate-500">{dep.id}</span>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 rounded">{dep.status}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Amount</label>
                                            <input
                                                type="number"
                                                value={dep.amount}
                                                onChange={e => updateDeposit(idx, 'amount', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm font-bold text-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Int. Rate (%)</label>
                                            <input
                                                type="number"
                                                value={dep.interestRate}
                                                onChange={e => updateDeposit(idx, 'interestRate', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Monthly Payout</label>
                                            <input
                                                type="number"
                                                value={dep.monthlyPayout || 0}
                                                onChange={e => updateDeposit(idx, 'monthlyPayout', Number(e.target.value))}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Start Date</label>
                                            <input
                                                type="text"
                                                value={dep.date}
                                                onChange={e => updateDeposit(idx, 'date', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Maturity Date</label>
                                            <input
                                                type="text"
                                                value={dep.maturityDate || ''}
                                                onChange={e => updateDeposit(idx, 'maturityDate', e.target.value)}
                                                className="w-full border rounded px-2 py-1 text-sm"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {financeData.deposits.length === 0 && <div className="text-center text-slate-400 py-4">No active deposits</div>}
                            <button
                                onClick={addDeposit}
                                className="w-full py-2 border border-dashed border-indigo-300 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50"
                            >
                                + Add Deposit
                            </button>
                        </div>
                    )}
                </div>
            </AdminModal>
        </div>
    );
}

export function AdminChits() {
    const { batches, addBatch, updateBatch, deleteBatch } = useGlobal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBatch, setEditingBatch] = useState<ChitBatch | null>(null);
    const [formData, setFormData] = useState<Partial<ChitBatch>>({});

    const handleEdit = (batch: ChitBatch) => {
        setEditingBatch(batch);
        setFormData(batch);
        setIsModalOpen(true);
    };

    const handleDelete = (batch: ChitBatch) => {
        if (confirm(`Delete batch ${batch.name}?`)) {
            deleteBatch(batch.id);
        }
    };

    const handleSubmit = () => {
        const batchData = formData as ChitBatch;
        if (editingBatch) {
            updateBatch(editingBatch.id, batchData);
        } else {
            addBatch({ ...batchData, id: batchData.id || `GK-${Date.now()}` });
        }
        setIsModalOpen(false);
        setEditingBatch(null);
        setFormData({});
    };

    const openAdd = () => {
        setEditingBatch(null);
        setFormData({
            status: 'Active',
            currentMonth: 'Jan',
            value: 100000,
            subscription: 5000,
            dividend: 0,
            nextAuction: 'TBD'
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Chit Batches</h2>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                >
                    <Plus className="w-4 h-4" /> Add Batch
                </button>
            </div>

            <AdminTable
                data={batches}
                keyField="id"
                columns={[
                    { header: 'ID', accessor: 'id', className: 'font-mono text-xs' },
                    { header: 'Batch Name', accessor: 'name', className: 'font-bold' },
                    { header: 'Value (₹)', accessor: (b) => b.value.toLocaleString('en-IN') },
                    { header: 'Month', accessor: 'currentMonth' },
                    {
                        header: 'Status', accessor: (b) => (
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${b.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                {b.status}
                            </span>
                        )
                    },
                    { header: 'Next Auction', accessor: 'nextAuction', className: 'text-xs text-slate-500' },
                ]}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingBatch ? 'Edit Batch' : 'New Chit Batch'}
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Batch Name</label>
                        <input
                            value={formData.name || ''}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Chit Value (₹)</label>
                        <input
                            type="number"
                            value={formData.value || ''}
                            onChange={e => setFormData({ ...formData, value: Number(e.target.value) })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Subscription (₹)</label>
                        <input
                            type="number"
                            value={formData.subscription || ''}
                            onChange={e => setFormData({ ...formData, subscription: Number(e.target.value) })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Current Month</label>
                        <input
                            value={formData.currentMonth || ''}
                            onChange={e => setFormData({ ...formData, currentMonth: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Next Auction</label>
                        <input
                            value={formData.nextAuction || ''}
                            onChange={e => setFormData({ ...formData, nextAuction: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select
                            value={formData.status || 'Active'}
                            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </AdminModal>
        </div>
    );
}

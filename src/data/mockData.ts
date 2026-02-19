import type { UserFinance } from '../types';

// ===== Logo handling =====
export const LOGO_URL = "/gk_groups_logo_1763895416033.png";
export const logoSrc = LOGO_URL;

// ===== Mock Users DB (for demo auth) =====
export const DEMO_USERS: Record<string, UserFinance> = {
    GK2025_0012: {
        personal: { userId: 'GK2025-0012', contact: '+91-9999999999', altContact: '+91-8888888888', home: '123 MG Road, Hyderabad, TS', office: 'GK Groups HQ, Banjara Hills, Hyderabad', name: 'Ravi Kumar' },
        chits: [
            { id: 'Main-01', value: 600000, taken: false, remaining: 3, paid: 5, joinedOn: 'Jan 2022', monthTaken: null, loss: 0 },
            { id: 'A-12', value: 300000, taken: true, remaining: 0, paid: 12, joinedOn: 'Sep 2021', monthTaken: 'Aug 2022', loss: 18000 },
        ],
        loans: { name: 'Ravi Kumar', loanAmount: 200000, takenDate: 'Feb 2023', expiry: 'Feb 2026', interest: 12.5, perMonth: 2100, paidInterest: 12000, paidPrincipal: 50000, balance: 150000, fines: 0 },
        credits: { name: 'Ravi Kumar', amount: 50000, givenOn: 'Mar 2024', expiry: 'Sep 2025', interest: 10, interestReceived: 3000, principalReceived: 10000, balance: 40000, otherDues: 0 },
    },
    U_2: {
        personal: { userId: 'U-2', contact: '+91-9000000002', altContact: '+91-8000000002', home: 'Hyderabad', office: 'GK Groups', name: 'Anita' },
        chits: [{ id: 'B-07', value: 400000, taken: false, remaining: 10, paid: 2, joinedOn: 'Jul 2024', monthTaken: null, loss: 0 }],
        loans: { name: 'Anita', loanAmount: 0, takenDate: '-', expiry: '-', interest: 0, perMonth: 0, paidInterest: 0, paidPrincipal: 0, balance: 0, fines: 0 },
        credits: { name: 'Anita', amount: 0, givenOn: '-', expiry: '-', interest: 0, interestReceived: 0, principalReceived: 0, balance: 0, otherDues: 0 },
    },
};

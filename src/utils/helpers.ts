import type { Bidder } from '../types';

// ===== Utility functions =====
export function formatINR(n: number) {
    return Number(n || 0).toLocaleString('en-IN');
}

export function isTop1Bidder(bidders: Bidder[], uid: string) {
    return bidders.length > 0 && bidders[0].userId === uid;
}

export function randRoom() {
    return `GK-${Math.floor(100000 + Math.random() * 900000)}`;
}

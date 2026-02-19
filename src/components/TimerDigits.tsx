import { useEffect, useState } from 'react';

export function TimerDigits() {
    const [, setTick] = useState(0);
    const [seconds, setSeconds] = useState<number>(600);

    useEffect(() => {
        const handler = () => {
            const s = (window as any).__gk_secondsLeft ?? 600;
            setSeconds(s);
            setTick(x => x + 1);
        };
        window.addEventListener('gk:tick', handler as any);
        handler();
        return () => window.removeEventListener('gk:tick', handler as any);
    }, []);

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return <div className="text-4xl font-black tracking-wider tabular-nums">{mm}:{ss}</div>;
}

import { useNavigate } from 'react-router-dom';

interface ExternalPortalProps {
    title: string;
    href: string;
}

export function ExternalPortal({ title, href }: ExternalPortalProps) {
    const navigate = useNavigate();

    const open = () => {
        if (!href) return alert('Link not configured. Please contact support.');
        const win = window.open(href, '_blank', 'noopener,noreferrer');
        if (!win) alert('Popup blocked. Please allow popups for this site.');
    };

    return (
        <section className="py-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                    <button onClick={() => navigate(-1)} className="text-sm rounded-full border px-3 py-1">
                        ← Back
                    </button>
                </div>
                <div className="mt-6 rounded-xl border bg-white p-5 text-sm">
                    <p>Payments are processed on our partner's secure page. Do not share OTP/PIN with anyone.</p>
                    <div className="mt-4 flex gap-2">
                        <button className="rounded border px-4 py-2" onClick={open}>
                            Open Portal
                        </button>
                        <button className="rounded border px-4 py-2" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

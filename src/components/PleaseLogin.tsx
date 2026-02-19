import { Link } from 'react-router-dom';

export function PleaseLogin() {
    return (
        <section className="py-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold">Please login to continue</h2>
                <p className="text-slate-600 mt-2">
                    Chit Funds and Personal Finance are visible only to the logged-in user.
                </p>
                <Link to="/" className="mt-4 inline-block rounded-full border px-4 py-2">
                    ← Back
                </Link>
            </div>
        </section>
    );
}

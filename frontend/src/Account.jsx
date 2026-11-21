import { useEffect, useState } from 'react';

const ROLE_LABELS = { CUSTOMER: 'Customer', VENDOR: 'Vendor' };

export default function Account() {
    const [state, setState] = useState({ status: 'loading' });

    useEffect(() => {
        const controller = new AbortController();

        fetch('/api/account', { signal: controller.signal })
            .then(async (response) => {
                if (response.status === 401) {
                    window.location.href = '/login';
                    return null;
                }
                if (!response.ok) throw new Error('Request failed');
                return { status: 'ready', account: await response.json() };
            })
            .then((result) => { if (result) setState(result); })
            .catch((error) => {
                if (error.name !== 'AbortError') setState({ status: 'error' });
            });

        return () => controller.abort();
    }, []);

    const { status, account } = state;

    return (
        <main>
            <a href="/">← Back to Search</a>

            {status === 'loading' && <p role="status">Loading account…</p>}

            {status === 'error' && (
                <p role="alert">Unable to load your account. Please try again.</p>
            )}

            {status === 'ready' && (
                <article>
                    <p className="eyebrow">{ROLE_LABELS[account.role].toUpperCase()} ACCOUNT</p>
                    <h1>My Account</h1>
                    <dl>
                        <div className="spec"><dt>Email</dt><dd>{account.email}</dd></div>
                        <div className="spec"><dt>Preferred name</dt><dd>{account.preferredName}</dd></div>
                        <div className="spec"><dt>Lab / company</dt><dd>{account.affiliation}</dd></div>
                        <div className="spec"><dt>Account type</dt><dd>{ROLE_LABELS[account.role]}</dd></div>
                    </dl>
                </article>
            )}
        </main>
    );
}
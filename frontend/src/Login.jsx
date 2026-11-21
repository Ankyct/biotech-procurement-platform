import { useState } from 'react';

export default function Login() {
    const [role, setRole] = useState('CUSTOMER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });

            if (response.status === 401) {
                const data = await response.json();
                setMessage(data.message);
                setStatus('error');
                return;
            }
            if (!response.ok) {
                throw new Error('Login failed');
            }

            window.location.href = '/';
        } catch (error) {
            setMessage('Unable to log in. Please try again.');
            setStatus('error');
        }
    }

    return (
        <main>
            <a href="/">← Back to Search</a>
            <h1>Log in</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="role-toggle" role="group" aria-label="Account type">
                    <button
                        type="button"
                        className={role === 'CUSTOMER' ? 'active' : ''}
                        aria-pressed={role === 'CUSTOMER'}
                        onClick={() => setRole('CUSTOMER')}
                    >
                        Customer
                    </button>
                    <button
                        type="button"
                        className={role === 'VENDOR' ? 'active' : ''}
                        aria-pressed={role === 'VENDOR'}
                        onClick={() => setRole('VENDOR')}
                    >
                        Vendor
                    </button>
                </div>

                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="username"
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </label>

                {status === 'error' && <p role="alert">{message}</p>}

                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Logging in…' : `Log in as ${role === 'CUSTOMER' ? 'customer' : 'vendor'}`}
                </button>
            </form>
        </main>
    );
}
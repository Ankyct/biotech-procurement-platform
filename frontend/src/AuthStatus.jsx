import { useEffect, useState } from 'react';

export default function AuthStatus() {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/auth/me')
            .then((response) => (response.ok ? response.json() : null))
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoaded(true));
    }, []);

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
    }

    if (!loaded) return null;

    return (
        <div className="auth-status">
            {user ? (
                <>
                    <a href="/account">{user.preferredName} ({user.role.toLowerCase()})</a>
                    <button type="button" onClick={handleLogout}>Log out</button>
                </>
            ) : (
                <a href="/login">Log in</a>
            )}
        </div>
    );
}
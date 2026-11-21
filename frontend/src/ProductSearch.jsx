import { useState } from 'react';
import AuthStatus from './AuthStatus';

export default function ProductSearch() {
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('idle');

    async function handleSearch(event) {
        event.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(
                `/api/products/search?keyword=${encodeURIComponent(keyword)}`
            );

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setProducts(data);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <main>
            <AuthStatus />
            <h1>Products & Services</h1>
            <p>Search laboratory products and services.</p>

            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search products"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {status === 'loading' && <p role="status">Searching...</p>}

            {status === 'error' && (
                <p role="alert">Unable to search products. Please try again.</p>
            )}

            {status === 'success' && (
                <section>
                    <h2>Search Results ({products.length})</h2>

                    {products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <div className="product-results">
                            {products.map((product) => (
                                <article className="product-card" key={product.id}>
                                    <p className="eyebrow">PRODUCTS & SERVICES</p>

                                    <h2>
                                        <a href={`/products/${product.id}`}>
                                            {product.name}
                                        </a>
                                    </h2>

                                    <p>{product.vendor}</p>
                                    <p className="product-card-price">
                                        ${Number(product.price).toFixed(2)}
                                    </p>
                                    <p>{product.description}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </main>
    );
}
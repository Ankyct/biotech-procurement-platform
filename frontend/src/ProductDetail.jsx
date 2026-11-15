import { useEffect, useState } from 'react';

export default function ProductDetail({ id }) {
  const [state, setState] = useState({ id, status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setState({ id, status: 'loading' });
    fetch(`/api/products/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async response => {
        if (response.status === 404) return { id, status: 'missing' };
        if (!response.ok) throw new Error('Request failed');
        return { id, status: 'ready', product: await response.json() };
      })
      .then(result => { if (!controller.signal.aborted) setState(result); })
      .catch(() => { if (!controller.signal.aborted) setState({ id, status: 'error' }); });
    return () => controller.abort();
  }, [id, attempt]);

  const status = state.id === id ? state.status : 'loading';
  return <main>
    <a href="/">← Back to Search Results</a>
    {status === 'loading' && <p role="status">Loading product details…</p>}
    {status === 'missing' && <h1>Product not found</h1>}
    {status === 'error' && <div role="alert"><p>Unable to load product details. Please try again.</p><button onClick={() => setAttempt(attempt + 1)}>Retry</button></div>}
    {status === 'ready' && <article>
      <p className="eyebrow">PRODUCTS & SERVICES</p>
      <h1>{state.product.name}</h1>
      <p>{state.product.vendor}</p>
      <p className="price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(state.product.price)}</p>
      <p>{state.product.description}</p>
      <h2>Specifications</h2>
      {Object.keys(state.product.specifications ?? {}).length ? <dl>{Object.entries(state.product.specifications).map(([key, value]) => <div className="spec" key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl> : <p>No additional specifications provided.</p>}
    </article>}
  </main>;
}

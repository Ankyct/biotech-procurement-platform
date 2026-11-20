import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductDetail from './ProductDetail';
import ProductSearch from './ProductSearch';
import './styles.css';

const match = window.location.pathname.match(/^\/products\/([^/]+)\/?$/);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {match ? (
      <ProductDetail id={match[1]} />
    ) : window.location.pathname === '/' ? (
      <ProductSearch />
    ) : (
      <main>
        <h1>Page not found</h1>
        <a href="/">Back to catalog</a>
      </main>
    )}
  </React.StrictMode>
);

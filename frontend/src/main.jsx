import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductDetail from './ProductDetail';
import ProductSearch from './ProductSearch';
import Login from './Login';
import Account from './Account';
import './styles.css';

const path = window.location.pathname;
const match = path.match(/^\/products\/([^/]+)\/?$/);

function App() {
  if (match) return <ProductDetail id={match[1]} />;
  if (path === '/') return <ProductSearch />;
  if (path === '/login') return <Login />;
  if (path === '/account') return <Account />;
  return (
    <main>
      <h1>Page not found</h1>
      <a href="/">Back to catalog</a>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductDetail from './ProductDetail';
import './styles.css';

const match = window.location.pathname.match(/^\/products\/([^/]+)\/?$/);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {match ? <ProductDetail id={match[1]} /> : window.location.pathname === '/' ? <main>
      <h1>Products & Services</h1>
      <p>Demo catalog — search integration is pending US3.</p>
      <ul><li><a href="/products/1">Sterile Pipette Tips</a></li><li><a href="/products/2">PCR Kit</a></li><li><a href="/products/3">Pipette Calibration Service</a></li></ul>
    </main> : <main><h1>Page not found</h1><a href="/">Back to catalog</a></main>}
  </React.StrictMode>
);

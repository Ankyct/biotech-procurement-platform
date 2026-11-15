import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const product = { name: 'Sterile Pipette Tips', description: 'Laboratory tips.', price: 24.99, vendor: 'Example Vendor', specifications: { Material: 'Polypropylene' } };

it('loads details from the API and renders vendor specifications', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => product });
  vi.stubGlobal('fetch', fetchMock);
  render(<ProductDetail id="1" />);
  expect(screen.getByRole('status').textContent).toContain('Loading');
  expect(await screen.findByRole('heading', { name: product.name })).toBeTruthy();
  for (const text of ['$24.99', product.vendor, product.description, 'Polypropylene']) expect(screen.getByText(text)).toBeTruthy();
  expect(fetchMock.mock.calls[0][0]).toBe('/api/products/1');
});

it('shows not found for a missing ID', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 404 }));
  render(<ProductDetail id="999" />);
  expect(await screen.findByRole('heading', { name: 'Product not found' })).toBeTruthy();
});

it('lets the customer retry a failed request', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ ok: true, json: async () => product }));
  render(<ProductDetail id="1" />);
  expect(await screen.findByRole('alert')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  expect(await screen.findByRole('heading', { name: product.name })).toBeTruthy();
});

it('ignores a stale response when navigating between products', async () => {
  let resolveFirst;
  const first = new Promise(resolve => { resolveFirst = resolve; });
  vi.stubGlobal('fetch', vi.fn().mockReturnValueOnce(first).mockResolvedValueOnce({ ok: true, json: async () => ({ ...product, name: 'PCR Kit' }) }));
  const view = render(<ProductDetail id="1" />);
  view.rerender(<ProductDetail id="2" />);
  expect(await screen.findByRole('heading', { name: 'PCR Kit' })).toBeTruthy();
  await act(async () => { resolveFirst({ ok: true, json: async () => product }); });
  expect(screen.queryByRole('heading', { name: product.name })).toBeNull();
});

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

type Price = {
  id: number;
  amount: string;
  currency: string;
  status: string;
  product: {
    id: number;
    name: string;
    category: string | null;
    brand: string | null;
  };
  location: {
    id: number;
    city: string;
    area: string | null;
  } | null;
};

export default function ComparePage() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<Price[]>('/prices')
      .then(setPrices)
      .catch((requestError) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to load prices.',
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const normalizedSearch = productSearch.trim().toLowerCase();
  const filteredPrices = prices.filter((price) =>
    price.product.name.toLowerCase().includes(normalizedSearch),
  );

  const grouped = filteredPrices.reduce<Record<string, Price[]>>((groups, price) => {
    const key = price.product.name;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(price);
    return groups;
  }, {});

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Compare prices</h1>
          <p className="page-subtitle">
            Compare real community-submitted prices by product and location.
          </p>
        </div>

        <Link className="btn btn-secondary-outline" to="/dashboard">
          Submit a price
        </Link>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="product-search">
          Search products
        </label>
        <input
          id="product-search"
          className="form-control"
          type="search"
          value={productSearch}
          onChange={(event) => setProductSearch(event.target.value)}
          placeholder="Search by product name"
        />
      </div>

      {loading && (
        <div className="table-panel">
          <div className="p-3">Loading price comparisons...</div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && prices.length === 0 && (
        <div className="table-panel">
          <div className="p-3">
            No price data is available yet. Submit a price from the dashboard
            to start comparing.
          </div>
        </div>
      )}

      {!loading && !error && prices.length > 0 && filteredPrices.length === 0 && (
        <div className="table-panel" role="status">
          <div className="p-3">No products match “{productSearch}”.</div>
        </div>
      )}

      {!loading && !error && filteredPrices.length > 0 && (
        <div className="compare-grid">
          {Object.entries(grouped).map(([productName, productPrices]) => (
            <div className="compare-card" key={productName}>
              <h3>{productName}</h3>

              {productPrices[0].product.category && (
                <p className="small text-muted mb-3">
                  {productPrices[0].product.category}
                </p>
              )}

              <ul>
                {productPrices.map((price) => (
                  <li key={price.id}>
                    <strong>
                      {price.amount} {price.currency}
                    </strong>{' '}
                    —{' '}
                    {price.location
                      ? `${price.location.city}${price.location.area ? `, ${price.location.area}` : ''}`
                      : 'Unknown location'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
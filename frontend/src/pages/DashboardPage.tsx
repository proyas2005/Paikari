import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPrices, votePrice, Price, VoteCounts } from '../services/prices';

export default function DashboardPage() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<number, VoteCounts>>({});

  async function handleVote(priceId: number, type: 'up' | 'down') {
    try {
      const result = await votePrice(priceId, type);
      setVotes((prev) => ({ ...prev, [priceId]: result }));
    } catch (err) {
      console.error('Vote failed:', err);
    }
  }

  useEffect(() => {
    fetchPrices()
      .then((data) => setPrices(data))
      .catch((err) => setError(err.message || 'Failed to load prices'))
      .finally(() => setLoading(false));
  }, []);

  const uniqueProducts = new Set(prices.map((p) => p.product_id)).size;
  const uniqueLocations = new Set(
    prices.map((p) => p.location_id).filter((id) => id !== null),
  ).size;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard overview</h1>
          <p className="page-subtitle">
            Live price data from the Paikari backend.
          </p>
        </div>
        <Link className="btn btn-accent" to="/submit-price">
          Submit a price
        </Link>
      </div>

      <div className="stats-grid">
        <div className="data-card">
          <span className="data-card-label">Prices recorded</span>
          <h2>{loading ? '…' : prices.length}</h2>
          <p>community price submissions</p>
        </div>
        <div className="data-card">
          <span className="data-card-label">Products tracked</span>
          <h2>{loading ? '…' : uniqueProducts}</h2>
          <p>unique products in the system</p>
        </div>
        <div className="data-card">
          <span className="data-card-label">Locations covered</span>
          <h2>{loading ? '…' : uniqueLocations}</h2>
          <p>cities and areas represented</p>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-panel-header">
          <h3>Recent prices</h3>
          <p>Latest submissions from the community.</p>
        </div>

        {loading && <p>Loading prices…</p>}
        {error && (
          <p style={{ color: 'crimson' }}>
            Error: {error}
          </p>
        )}
        {!loading && !error && prices.length === 0 && (
          <p>
            No prices yet.{' '}
            <Link to="/submit-price">Submit the first one</Link>.
          </p>
        )}

        {!loading && !error && prices.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p) => (



                <tr key={p.id}>
                  <td>{p.product?.name ?? `#${p.product_id}`}</td>
                  <td>{p.product?.category ?? '—'}</td>
                  <td>
                    {p.location
                      ? `${p.location.city}${
                          p.location.area ? ` — ${p.location.area}` : ''
                        }`
                      : '—'}
                  </td>
                  <td>
                    {p.amount} {p.currency}
                  </td>
                  <td>{p.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-success me-1"
                      onClick={() => handleVote(p.id, 'up')}
                      title="Upvote this price"
                    >
                      👍 {votes[p.id]?.up ?? 0}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleVote(p.id, 'down')}
                      title="Downvote this price"
                    >
                      👎 {votes[p.id]?.down ?? 0}
                    </button>
                  </td>
                </tr>
                


              ))}
            </tbody>
         
          </table>
        )}
      </div>
    </div>
  );
}
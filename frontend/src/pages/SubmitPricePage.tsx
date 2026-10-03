import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { submitPrice } from '../services/prices';

export default function SubmitPricePage() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BDT');

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setSubmitting(true);
    try {
      await submitPrice({
        product_name: productName,
        category: category || undefined,
        brand: brand || undefined,
        city,
        area: area || undefined,
        amount: Number(amount),
        currency,
      });
      setStatus('Price submitted successfully! It is now visible on the dashboard.');
      setProductName('');
      setCategory('');
      setBrand('');
      setCity('');
      setArea('');
      setAmount('');
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to submit your price. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Submit a price"
      subtitle="Share a real product price with the Paikari community. It takes less than a minute."
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="e.g. Rice 5kg"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="e.g. Grocery"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder="e.g. Fresh"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="e.g. Dhaka"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Area</label>
          <input
            type="text"
            className="form-control"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            placeholder="e.g. Mirpur"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="e.g. 520"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Currency</label>
          <select
            className="form-control"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="BDT">BDT — Bangladeshi Taka</option>
            <option value="USD">USD — US Dollar</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}
        {status && (
          <div className="alert alert-success py-2" role="status">
            {status}
          </div>
        )}

        <button
          className="btn btn-success w-100"
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Submit price'}
        </button>
      </form>

      <p className="text-center mt-4 mb-0">
        <Link to="/dashboard">Back to dashboard</Link>
      </p>
    </AuthLayout>
  );
}
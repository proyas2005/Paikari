import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { registerAccount, signInWithGoogle } from '../lib/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setSubmitting(true);
    try {
      const result = await registerAccount({ name, email, password, password_confirmation: passwordConfirmation });
      setStatus(result.message);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create your account.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join Paikari to share and compare prices with your community.">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password (at least 8 characters)" required minLength={8} />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm password</label>
          <input type="password" className="form-control" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder="Confirm your password" required />
        </div>
        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        {status && <div className="alert alert-success py-2" role="status">{status}</div>}
        <button className="btn btn-success w-100" disabled={submitting}>{submitting ? 'Creating account…' : 'Register'}</button>
      </form>
      <div className="position-relative text-center my-3"><hr /><span className="bg-white px-2 position-relative" style={{ top: '-28px' }}>or</span></div>
      <button type="button" className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2" onClick={signInWithGoogle}><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.32z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.96l3.01 2.32C4.68 5.16 6.66 3.58 9 3.58z"/></svg>Continue with Google</button>
      <p className="text-center mt-4 mb-0">Already have an account? <Link to="/login">Sign in</Link></p>
    </AuthLayout>
  );
}

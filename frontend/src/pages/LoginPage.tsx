import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { loginAccount, signInWithGoogle } from '../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginAccount({ email, password, remember });
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to explore community price insights in Bangladesh.">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            <label className="form-check-label" htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="small text-decoration-none">Forgot password?</a>
        </div>
        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        <button className="btn btn-primary w-100" disabled={submitting}>{submitting ? 'Signing in...' : 'Log in'}</button>
      </form>
      <div className="position-relative text-center my-3"><hr /><span className="bg-white px-2 position-relative" style={{ top: '-28px' }}>or</span></div>
      <button type="button" className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2" onClick={signInWithGoogle}><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.32z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.96l3.01 2.32C4.68 5.16 6.66 3.58 9 3.58z"/></svg>Continue with Google</button>
      <p className="text-center mt-4 mb-0">New to Paikari? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}

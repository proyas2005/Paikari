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
      <button type="button" className="btn btn-outline-dark w-100" onClick={signInWithGoogle}>Continue with Google</button>
      <p className="text-center mt-4 mb-0">New to Paikari? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}

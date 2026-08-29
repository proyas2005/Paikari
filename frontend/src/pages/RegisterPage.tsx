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
      <button type="button" className="btn btn-outline-dark w-100" onClick={signInWithGoogle}>Continue with Google</button>
      <p className="text-center mt-4 mb-0">Already have an account? <Link to="/login">Sign in</Link></p>
    </AuthLayout>
  );
}

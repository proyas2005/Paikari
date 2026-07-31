import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to explore community price insights in Bangladesh.">
      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label" htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="small text-decoration-none">Forgot password?</a>
        </div>
        <button className="btn btn-primary w-100">Log in</button>
      </form>
      <p className="text-center mt-4 mb-0">New to Paikari? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}
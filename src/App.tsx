import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';

function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="brand-badge mx-auto mb-3">P</div>
            <h2 className="fw-bold">{title}</h2>
            <p className="text-muted mb-0">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to explore community price insights in Bangladesh.">
      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
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
      <p className="text-center mt-4 mb-0">
        New to Paikari? <Link to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout title="Create your account" subtitle="Join Paikari to share and compare prices with your community.">
      <form>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
      <p className="text-center mt-4 mb-0">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" replace state={{ from: location }} />} />
    </Routes>
  );
}

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

function HomePage() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container py-3">
          <Link className="navbar-brand fw-bold text-primary" to="/">Paikari</Link>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-primary" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Create account</Link>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge bg-primary-subtle text-primary mb-3">Community price intelligence</span>
            <h1 className="display-4 fw-bold mb-3">Know what things cost before you buy.</h1>
            <p className="lead text-muted mb-4">
              Compare prices across local markets, share updates, and make smarter purchasing decisions in Bangladesh.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link className="btn btn-primary btn-lg" to="/register">Get started</Link>
              <Link className="btn btn-outline-secondary btn-lg" to="/login">See login</Link>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold">Why Paikari?</h5>
                <ul className="list-group list-group-flush mt-3">
                  <li className="list-group-item px-0">Live price insights from your community</li>
                  <li className="list-group-item px-0">Simple comparison for everyday essentials</li>
                  <li className="list-group-item px-0">Smarter buying decisions without the guesswork</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace state={{ from: location }} />} />
    </Routes>
  );
}

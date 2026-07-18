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
    <div className="home-shell">
      <nav className="top-nav">
        <div className="container nav-content">
          <div className="nav-left">
            <div className="brand-mark">P</div>
            <span className="brand-name">Paikari</span>
          </div>
          <div className="nav-links">
            <Link className="nav-link-custom" to="/dashboard">Dashboard</Link>
            <Link className="nav-link-custom" to="/compare">Compare</Link>
            <Link className="nav-link-custom" to="/login">Sign in</Link>
          </div>
          <div className="nav-actions">
            <Link className="btn btn-accent" to="/register">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="hero-banner">
        <div className="hero-text-panel hero-text-left">
          <h1 className="hero-title">Compare prices across different shops, brands and locations instantly.</h1>
          <p className="hero-description">
            See how prices change over time to know if they are fair or not.
          </p>
          <div className="hero-buttons hero-buttons-left">
            <Link className="btn btn-accent btn-lg" to="/register">Start free trial</Link>
            <Link className="btn btn-secondary-outline btn-lg" to="/login">Watch demo</Link>
          </div>
          <div className="category-chips">
            <span>swapno</span>
            <span>local markets</span>
            <span>electronics</span>
            <span>clothings</span>
            <span>sportswear</span>
            <span>others</span>
          </div>
        </div>

        <aside className="hero-logo-panel">
          <div className="logo-panel-copy">
            <span className="logo-panel-label">Supermarket price snapshot</span>
            <p className="logo-panel-text">Compare pricing from leading local stores side by side to choose the best deal fast.</p>
          </div>
          <div className="logo-grid">
            <div className="logo-card logo-card-logo">
              <img src="/logos/agora.svg" alt="Agora logo" />
            </div>
            <div className="logo-card logo-card-logo">
              <img src="/logos/meena-bazar.svg" alt="Meena Bazar logo" />
            </div>
            <div className="logo-card logo-card-logo">
              <img src="/logos/unimart.svg" alt="Unimart logo" />
            </div>
            <div className="logo-card logo-card-logo">
              <img src="/logos/swapno.svg" alt="Swapno logo" />
            </div>
          </div>
        </aside>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="brand-mark">P</div>
            <div>
              <div className="brand-name">Paikari</div>
              <p className="footer-copy">Trusted price comparison for communities across Bangladesh.</p>
            </div>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Features</a>
            <a href="#" className="footer-link">Pricing</a>
            <a href="#" className="footer-link">Security</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Paikari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard overview</h1>
          <p className="page-subtitle">Placeholder insights for price comparisons, store activity, and market trends.</p>
        </div>
        <Link className="btn btn-accent" to="/register">Create account</Link>
      </div>

      <div className="stats-grid">
        <div className="data-card">
          <span className="data-card-label">Stores tracked</span>
          <h2>22</h2>
          <p>swapno and local markets in your area</p>
        </div>
        <div className="data-card">
          <span className="data-card-label">Price checks</span>
          <h2>148</h2>
          <p>recent product price lookups</p>
        </div>
        <div className="data-card">
          <span className="data-card-label">Avg. savings</span>
          <h2>12%</h2>
          <p>estimated savings when you compare first</p>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-panel-header">
          <h3>Recent price comparisons</h3>
          <p>Stub data showing how prices compare across stores.</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Agora</th>
              <th>Meena Bazar</th>
              <th>Unimart</th>
              <th>Swapno</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rice 5kg</td>
              <td>520 TK</td>
              <td>540 TK</td>
              <td>505 TK</td>
              <td>530 TK</td>
            </tr>
            <tr>
              <td>Wheat flour 2kg</td>
              <td>120 TK</td>
              <td>115 TK</td>
              <td>118 TK</td>
              <td>122 TK</td>
            </tr>
            <tr>
              <td>Cooking oil 1L</td>
              <td>250 TK</td>
              <td>245 TK</td>
              <td>248 TK</td>
              <td>252 TK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparePage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Compare prices</h1>
          <p className="page-subtitle">Stub comparison cards for popular categories and stores.</p>
        </div>
        <Link className="btn btn-secondary-outline" to="/dashboard">View dashboard</Link>
      </div>

      <div className="compare-grid">
        <div className="compare-card">
          <h3>Electronics</h3>
          <ul>
            <li>Smartphone — Agora 18,900 TK</li>
            <li>Headphones — Meena Bazar 2,450 TK</li>
            <li>USB cable — Unimart 180 TK</li>
          </ul>
        </div>
        <div className="compare-card">
          <h3>Clothings</h3>
          <ul>
            <li>T-shirt — Swapno 420 TK</li>
            <li>Jeans — Agora 1,250 TK</li>
            <li>Shoes — Meena Bazar 1,780 TK</li>
          </ul>
        </div>
        <div className="compare-card">
          <h3>Sportswear</h3>
          <ul>
            <li>Training pants — Unimart 850 TK</li>
            <li>Joggers — Swapno 950 TK</li>
            <li>Sports cap — Agora 220 TK</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace state={{ from: location }} />} />
    </Routes>
  );
}

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="top-nav">
      <div className="container nav-content">
        <div className="nav-left">
          <img src="/app/logos/paikari.svg" alt="Paikari logo" className="brand-mark-inline" />
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
  );
}
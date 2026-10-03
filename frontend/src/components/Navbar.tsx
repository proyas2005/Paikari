 import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="top-nav">
      <div className="container nav-content">

        {/* Paikari Logo */}
        <div className="nav-left">
          <Link to="/" className="paikari-logo">
            <img
              src={`${import.meta.env.BASE_URL}paikari-logo.png`}
              alt="Paikari"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">

          <Link
            to="/dashboard"
            className="nav-link-custom"
          >
            Dashboard
          </Link>

          <Link
            to="/compare"
            className="nav-link-custom"
          >
            Compare
          </Link>

          <Link
            to="/login"
            className="nav-link-custom"
          >
            Sign in
          </Link>

        </div>

        {/* Get Started Button */}
        <div className="nav-actions">
          <Link
            to="/register"
            className="btn btn-accent"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}
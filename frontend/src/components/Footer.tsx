import { Link } from 'react-router-dom';

export default function Footer() {
  return (
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
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Paikari. All rights reserved.</p>
      </div>
    </footer>
  );
}
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="home-shell">
      <Navbar />
      <main className="page-shell" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">Contact us</h1>
            <p className="page-subtitle">
              Questions, feedback, or partnership ideas? We would love to hear from you.
            </p>
          </div>
          <Link className="btn btn-accent" to="/register">Get started</Link>
        </div>
        <div className="compare-grid">
          <div className="compare-card">
            <h3>General questions</h3>
            <p>For feedback, suggestions, or anything else:</p>
            <p><strong>hello@paikari.app</strong></p>
          </div>
          <div className="compare-card">
            <h3>Business enquiries</h3>
            <p>For retailers and wholesalers interested in verified accounts:</p>
            <p><strong>business@paikari.app</strong></p>
          </div>
          <div className="compare-card">
            <h3>Report a problem</h3>
            <p>Found a suspicious price or a bug? Let us know:</p>
            <p><strong>report@paikari.app</strong></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
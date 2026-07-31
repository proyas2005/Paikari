import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="home-shell">
      <Navbar />
      <main className="hero-banner">
        <div className="hero-text-panel hero-text-left">
          <h1 className="hero-title">Compare prices across different shops, brands and locations instantly.</h1>
          <p className="hero-description">See how prices change over time to know if they are fair or not.</p>
          <div className="hero-buttons hero-buttons-left">
            <Link className="btn btn-accent btn-lg" to="/register">Start free trial</Link>
            <Link className="btn btn-secondary-outline btn-lg" to="/login">Watch demo</Link>
          </div>
          <div className="category-chips">
            <span>swapno</span><span>local markets</span><span>electronics</span><span>clothings</span><span>sportswear</span><span>others</span>
          </div>
        </div>
        <aside className="hero-logo-panel">
          <div className="logo-panel-copy">
            <span className="logo-panel-label">Supermarket price snapshot</span>
            <p className="logo-panel-text">Compare pricing from leading local stores side by side to choose the best deal fast.</p>
          </div>
          <div className="logo-grid">
            {['agora', 'meena-bazar', 'unimart', 'swapno'].map((store) => (
              <div className="logo-card logo-card-logo" key={store}><img src={`/logos/${store}.svg`} alt={`${store} logo`} /></div>
            ))}
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
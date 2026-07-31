import { Link } from 'react-router-dom';

export default function ComparePage() {
  return (
    <div className="page-shell">
      <div className="page-header"><div><h1 className="page-title">Compare prices</h1><p className="page-subtitle">Stub comparison cards for popular categories and stores.</p></div><Link className="btn btn-secondary-outline" to="/dashboard">View dashboard</Link></div>
      <div className="compare-grid">
        <div className="compare-card"><h3>Electronics</h3><ul><li>Smartphone — Agora 18,900 TK</li><li>Headphones — Meena Bazar 2,450 TK</li><li>USB cable — Unimart 180 TK</li></ul></div>
        <div className="compare-card"><h3>Clothings</h3><ul><li>T-shirt — Swapno 420 TK</li><li>Jeans — Agora 1,250 TK</li><li>Shoes — Meena Bazar 1,780 TK</li></ul></div>
        <div className="compare-card"><h3>Sportswear</h3><ul><li>Training pants — Unimart 850 TK</li><li>Joggers — Swapno 950 TK</li><li>Sports cap — Agora 220 TK</li></ul></div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="page-shell">
      <div className="page-header"><div><h1 className="page-title">Dashboard overview</h1><p className="page-subtitle">Placeholder insights for price comparisons, store activity, and market trends.</p></div><Link className="btn btn-accent" to="/register">Create account</Link></div>
      <div className="stats-grid">
        <div className="data-card"><span className="data-card-label">Stores tracked</span><h2>22</h2><p>swapno and local markets in your area</p></div>
        <div className="data-card"><span className="data-card-label">Price checks</span><h2>148</h2><p>recent product price lookups</p></div>
        <div className="data-card"><span className="data-card-label">Avg. savings</span><h2>12%</h2><p>estimated savings when you compare first</p></div>
      </div>
      <div className="table-panel">
        <div className="table-panel-header"><h3>Recent price comparisons</h3><p>Stub data showing how prices compare across stores.</p></div>
        <table className="data-table"><thead><tr><th>Product</th><th>Agora</th><th>Meena Bazar</th><th>Unimart</th><th>Swapno</th></tr></thead><tbody>
          <tr><td>Rice 5kg</td><td>520 TK</td><td>540 TK</td><td>505 TK</td><td>530 TK</td></tr>
          <tr><td>Wheat flour 2kg</td><td>120 TK</td><td>115 TK</td><td>118 TK</td><td>122 TK</td></tr>
          <tr><td>Cooking oil 1L</td><td>250 TK</td><td>245 TK</td><td>248 TK</td><td>252 TK</td></tr>
        </tbody></table>
      </div>
    </div>
  );
}
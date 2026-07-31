import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
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
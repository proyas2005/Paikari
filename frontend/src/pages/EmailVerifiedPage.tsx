import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function EmailVerifiedPage() {
  const [searchParams] = useSearchParams();
  const invalid = searchParams.get('status') === 'invalid';

  return (
    <AuthLayout title={invalid ? 'Verification link unavailable' : 'Email verified'} subtitle={invalid ? 'This link has expired or was already used. Sign in to receive a new one.' : 'Your Paikari account is ready to use.'}>
      <Link className="btn btn-success w-100" to="/login">Continue to sign in</Link>
    </AuthLayout>
  );
}

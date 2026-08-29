import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function EmailVerifiedPage() {
  return (
    <AuthLayout title="Email verified" subtitle="Your Paikari account is ready to use.">
      <Link className="btn btn-success w-100" to="/login">Continue to sign in</Link>
    </AuthLayout>
  );
}

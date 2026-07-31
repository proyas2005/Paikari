import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout title="Create your account" subtitle="Join Paikari to share and compare prices with your community.">
      <form>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" />
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
      <p className="text-center mt-4 mb-0">Already have an account? <Link to="/login">Sign in</Link></p>
    </AuthLayout>
  );
}
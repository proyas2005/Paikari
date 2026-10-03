import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ComparePage from '../pages/ComparePage';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import EmailVerifiedPage from '../pages/EmailVerifiedPage';
import SubmitPricePage from '../pages/SubmitPricePage';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email-verified" element={<EmailVerifiedPage />} />
      <Route path="/submit-price" element={<SubmitPricePage />} />
      <Route path="*" element={<Navigate to="/" replace state={{ from: location }} />} />
      
    </Routes>
  );
}

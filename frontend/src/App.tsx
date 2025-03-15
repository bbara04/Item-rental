// App.tsx
import React, { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavigationService from './NavigationService';
import MainPanel from './components/MainPanel';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    NavigationService.setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      // Redirect to auth on default
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/home" element={<MainPanel />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;

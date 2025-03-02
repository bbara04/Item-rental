// App.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavigationService from './NavigationService';
import HomePanel from './components/HomePanel';
import LoginPanel from './components/authentication/LoginPanel';
import RegisterPanel from './components/authentication/RegisterPanel';
import { User } from './dto/User';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    NavigationService.setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      // Redirect to auth on default
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPanel setGlobalUser={user => setUser(user)}/>} />
      <Route path="/register" element={<RegisterPanel setGlobalUser={user => setUser(user)}/>} />
      <Route path="/home" element={<HomePanel user={user}/>} />
    </Routes>
  );
};

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceHub from './pages/ServiceHub';
import ServiceDetail from './pages/ServiceDetail';
import CityHub from './pages/CityHub';
import CityDetail from './pages/CityDetail';
import StaticPage from './pages/StaticPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Layout wrapper — shows Header + Footer for standard pages
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ── Auth pages (no header/footer) ── */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* ── User dashboard (no header/footer — has its own sidebar) ── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* ── Admin panel (no header/footer) ── */}
          <Route
            path="/admin"
            element={<AdminPanel />}
          />

          {/* ── Main site pages (with header/footer) ── */}
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />

                  {/* Services routes */}
                  <Route path="/services" element={<ServiceHub />} />
                  <Route path="/services/:serviceName" element={<ServiceDetail />} />

                  {/* Cities routes */}
                  <Route path="/cities" element={<CityHub />} />
                  <Route path="/cities/:cityName" element={<CityDetail />} />

                  {/* Policy & static routes */}
                  <Route path="/cancellation-policy" element={<StaticPage />} />
                  <Route path="/privacy-policy" element={<StaticPage />} />
                  <Route path="/tnc" element={<StaticPage />} />
                  <Route path="/delete-account" element={<StaticPage />} />
                  <Route path="/support" element={<StaticPage />} />
                  <Route path="/press" element={<StaticPage />} />
                  <Route path="/credits" element={<StaticPage />} />
                  <Route path="/blog" element={<StaticPage />} />
                  <Route path="/frequently-asked-questions" element={<StaticPage />} />

                  {/* Wildcard 404 fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './components/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EventSetupPage } from './pages/EventSetupPage';
import { PublicBookingPage } from './pages/PublicBookingPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#f9f9ff] text-slate-900 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Public Un-guarded Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book/:userId/:slug" element={<PublicBookingPage />} />
            <Route path="/booking-confirmed" element={<BookingSuccessPage />} />

            {/* Protected Host Control Center Routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/events/new"
              element={
                <RequireAuth>
                  <EventSetupPage />
                </RequireAuth>
              }
            />

            {/* Root Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

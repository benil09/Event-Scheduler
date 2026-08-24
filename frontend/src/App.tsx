import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarLayout } from './components/SidebarLayout';
import { RequireAuth } from './components/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EventSetupPage } from './pages/EventSetupPage';
import { PublicBookingPage } from './pages/PublicBookingPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Unwrapped Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* SidebarLayout Wrapped Pages matching the 4 Screenshots */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <SidebarLayout>
                <DashboardPage />
              </SidebarLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/events/new"
          element={
            <RequireAuth>
              <SidebarLayout>
                <EventSetupPage />
              </SidebarLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/book/:userId/:slug"
          element={
            <SidebarLayout>
              <PublicBookingPage />
            </SidebarLayout>
          }
        />

        <Route
          path="/booking-confirmed"
          element={
            <SidebarLayout>
              <BookingSuccessPage />
            </SidebarLayout>
          }
        />

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

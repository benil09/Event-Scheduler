import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarLayout } from './components/SidebarLayout';
import { PublicLayout } from './components/PublicLayout';
import { RequireAuth } from './components/RequireAuth';
import { HomePage } from './pages/HomePage';
import { HostProfilePage } from './pages/HostProfilePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EventSetupPage } from './pages/EventSetupPage';
import { PublicBookingPage } from './pages/PublicBookingPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Pages wrapped in PublicLayout */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />

        <Route
          path="/profile/:hostId"
          element={
            <PublicLayout>
              <HostProfilePage />
            </PublicLayout>
          }
        />

        <Route
          path="/host/:hostId"
          element={
            <PublicLayout>
              <HostProfilePage />
            </PublicLayout>
          }
        />

        <Route
          path="/book/:userId/:slug"
          element={
            <PublicLayout>
              <PublicBookingPage />
            </PublicLayout>
          }
        />

        <Route
          path="/booking-confirmed"
          element={
            <PublicLayout>
              <BookingSuccessPage />
            </PublicLayout>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Host Protected Workspace Routes */}
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

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

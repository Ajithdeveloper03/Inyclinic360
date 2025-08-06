import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import ClinicDashboard from './pages/ClinicDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientsPage from './pages/PatientsPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import StaffManagementPage from './pages/StaffManagementPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import MyRecordsPage from './pages/MyRecordsPage';
import PaymentsPage from './pages/PaymentsPage';
import HealthAssistantPage from './pages/HealthAssistantPage';
import TelemedicinePage from './pages/TelemedicinePage';
import AIInsightsPage from './pages/AIInsightsPage';
import EmergencyPage from './pages/EmergencyPage';
import HealthTrackingPage from './pages/HealthTrackingPage';
import InsurancePage from './pages/InsurancePage';
import ProfileSettings from './pages/ProfileSettings';
import Billing from './pages/Billing';
import AppointmentBookingPage from './components/AppointmentBookingModal';
import MyDoctors from './pages/MyDoctors';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/book-appointment" element={<AppointmentBookingPage />} />

              {/* Clinic Routes */}
              <Route
                path="/clinic-dashboard"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <ClinicDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <AppointmentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patients"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <PatientsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/records"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <MedicalRecordsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <StaffManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/telemedicine"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <TelemedicinePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-insights"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <AIInsightsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emergency"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <EmergencyPage />
                  </ProtectedRoute>
                }
              />

              {/* Patient Routes */}
              <Route
                path="/patient-dashboard"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-appointments"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <MyAppointmentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-records"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <MyRecordsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-doctors"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <MyDoctors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <PaymentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/health-assistant"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <HealthAssistantPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient-telemedicine"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <TelemedicinePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/health-tracking"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <HealthTrackingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/insurance"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <InsurancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/billing-summary"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <Billing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emergency-contact"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <EmergencyPage />
                  </ProtectedRoute>
                }
              />

              {/* Shared Routes */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute requiredRole="clinic">
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient-settings"
                element={
                  <ProtectedRoute requiredRole="patient">
                    <ProfileSettings />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
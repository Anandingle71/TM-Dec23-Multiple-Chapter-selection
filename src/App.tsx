import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import CreateLessonPlan from './pages/CreateLessonPlan';
import CreateQuiz from './pages/CreateQuiz';
import CreateWorksheet from './pages/CreateWorksheet';
import CreatePresentation from './pages/CreatePresentation';
import CreateAssessment from './pages/CreateAssessment';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthCallback } from './components/AuthCallback';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage type="login" />} />
          <Route path="/signup" element={<LoginPage type="signup" />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/lesson-plan"
            element={
              <ProtectedRoute>
                <CreateLessonPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/quiz"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/worksheet"
            element={
              <ProtectedRoute>
                <CreateWorksheet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/presentation"
            element={
              <ProtectedRoute>
                <CreatePresentation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/assessment"
            element={
              <ProtectedRoute>
                <CreateAssessment />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
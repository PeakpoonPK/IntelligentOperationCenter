import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/layout/layout";
import { OverviewPage } from "./pages/overview-page";
import { OPDPage } from "./pages/opd-page";
import { IPDPage } from "./pages/ipd-page";
import { FinancialPage } from "./pages/financial-page";
import { MeetingPage } from "./pages/meeting-page";
import { HRPage } from "./pages/hr-page";
import { LoginPage } from "./pages/login-page";
import { NotificationsPage } from "./pages/notifications-page";
import { ProfilePage } from "./pages/profile-page";
import { SettingsPage } from "./pages/settings-page";
import { AuthProvider } from "./context/auth-context";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem('hospital_user');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Public Route Component (redirect to home if already logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem('hospital_user');
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthProvider>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "opd", element: <OPDPage /> },
      { path: "ipd", element: <IPDPage /> },
      { path: "financial", element: <FinancialPage /> },
      { path: "meeting", element: <MeetingPage /> },
      { path: "hr", element: <HRPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
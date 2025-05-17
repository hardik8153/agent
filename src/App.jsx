import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Import your components
import Support_Overview from "./components/Support_Overview";
import Sidebar from "./components/Sidebar";
import Conversations from "./Page/Conversations";
import AdminSettings from "./Page/AdminSettings";
import Users from "./components/AdminSettings/Users";
import CannedResponses from "./components/Cannedresponses";
import RolesAndPermission from "./components/AdminSettings/RolesAndPermission";
import ManageProfile from "./components/Profile/ManageProfile";
import ManagePermission from "./components/AdminSettings/ManagePermission";
import RecomendationChannels from "./components/AdminSettings/RecomendationChannels";
import Faq from "./Page/Faq/Fap"; // Assuming Fap is a typo for Faq
import Intelliassign from "./Page/Settings/Intelliassign/Intelliassign";
import CsSettings from "./Page/Settings/CsSettings";
import AutoResponse from "./Page/Settings/AutoResponse/AutoResponse";
import AutoCreateFlow from "./Page/Settings/AutoResponse/AutoCreateFlow";
import EditAutoCreateFlow from "./Page/Settings/AutoResponse/EditAutoCreateFlow";
import Integration from "./Page/Settings/Integration/Integration";
import API_Settings from "./Page/Settings/Integration/API_Settings";
import Conversationhook from "./Page/Settings/Integration/Conversationhook";
import Security from "./Page/Settings/Security/Security";
import AccountBilling from "./components/AdminSettings/AccountBilling";
import AccountSettingsDetails from '@/components/AdminSettings/AccountSettingsDetails';
import PlansAndBillingDetails from '@/components/AdminSettings/PlansAndBillingDetails';
import Login from "./Page/login";
import ForgetPassword from "./Page/forgetpassword";
import ChangePassword from "./Page/changepassword";

// Helper function to check authentication status
const checkAuthStatus = () => {
    // 1. Check localStorage (for "Remember me" with 30-day expiry)
    const storedToken = localStorage.getItem('token');
    const storedExpiry = localStorage.getItem('tokenExpiry');
    const storedUserData = localStorage.getItem('cduserdata');

    if (storedToken && storedExpiry && storedUserData) {
        const expiryTime = parseInt(storedExpiry, 10);
        if (new Date().getTime() < expiryTime) {
            return true; // Token valid and not expired
        } else {
            // Token expired, clear it from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('cduserdata');
            localStorage.removeItem('tokenExpiry');
        }
    }

    // 2. If not found or expired in localStorage, check sessionStorage (for current session only)
    const sessionToken = sessionStorage.getItem('token');
    const sessionUserData = sessionStorage.getItem('cduserdata');
    if (sessionToken && sessionUserData) {
        return true; // Token valid for the current session
    }

    // 3. No valid token found
    return false;
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = checkAuthStatus();
  if (!isAuthenticated) {
    localStorage.removeItem('token');
    localStorage.removeItem('cduserdata');
    localStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cduserdata');
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/forgetpassword", "/changepassword"];
  const currentPath = location.pathname.toLowerCase();
  const isAuthenticated = checkAuthStatus(); 
  const shouldHideSidebar = hideSidebarRoutes.includes(currentPath) || !isAuthenticated;

  return (
    <div className="flex h-screen overflow-hidden"> {/* Added h-screen and overflow-hidden for common layout */}
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1 overflow-y-auto"> {/* Added for scrollable content area */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={<PrivateRoute><Support_Overview /></PrivateRoute>}
          />
          <Route
            path="/Conversations"
            element={<PrivateRoute><Conversations /></PrivateRoute>}
          />
          <Route
            path="/Cannedresponses"
            element={<PrivateRoute><CannedResponses /></PrivateRoute>}
          />
          <Route
            path="/AdminSettings"
            element={<PrivateRoute><AdminSettings /></PrivateRoute>}
          />
          <Route
            path="/admin/users"
            element={<PrivateRoute><Users /></PrivateRoute>}
          />
          <Route
            path="/admin/roles"
            element={<PrivateRoute><RolesAndPermission /></PrivateRoute>}
          />
          <Route
            path="/manageProfile"
            element={<PrivateRoute><ManageProfile /></PrivateRoute>}
          />
          <Route
            path="/managePermission/:roleId"
            element={<PrivateRoute><ManagePermission /></PrivateRoute>}
          />
          <Route
            path="/channels/:id"
            element={<PrivateRoute><RecomendationChannels /></PrivateRoute>}
          />
          <Route
            path="/Faq"
            element={<PrivateRoute><Faq /></PrivateRoute>}
          />
          <Route
            path="/Intelliassign"
            element={<PrivateRoute><Intelliassign /></PrivateRoute>}
          />
          <Route
            path="/CsSettings"
            element={<PrivateRoute><CsSettings /></PrivateRoute>}
          />
          <Route
            path="/AutoResponse"
            element={<PrivateRoute><AutoResponse /></PrivateRoute>}
          />
          <Route
            path="/AutoCreateFlow"
            element={<PrivateRoute><AutoCreateFlow /></PrivateRoute>}
          />
          <Route
            path="/AutoCreateFlow/edit/:flowId"
            element={<PrivateRoute><EditAutoCreateFlow /></PrivateRoute>}
          />
          <Route
            path="/Integration"
            element={<PrivateRoute><Integration /></PrivateRoute>}
          />
          <Route
            path="/API_Settings"
            element={<PrivateRoute><API_Settings /></PrivateRoute>}
          />
          <Route
            path="/Conversationhook"
            element={<PrivateRoute><Conversationhook /></PrivateRoute>}
          />
          <Route
            path="/Security"
            element={<PrivateRoute><Security /></PrivateRoute>}
          />
          <Route
            path="/admin/billing"
            element={<PrivateRoute><AccountBilling /></PrivateRoute>}
          />
          <Route
            path="/AccountSettingsDetails"
            element={<PrivateRoute><AccountSettingsDetails /></PrivateRoute>}
          />
          <Route
            path="/plans-and-billing"
            element={<PrivateRoute><PlansAndBillingDetails /></PrivateRoute>}
          />

          {/* Fallback for any other route - could be a 404 page or redirect to home if authenticated */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />

        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
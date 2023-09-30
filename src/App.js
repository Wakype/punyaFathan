import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./page/auth/login";
import Dashboard from "./page/dashboard/dashboard";

import ForgotPassword from "./page/auth/forgotP";
import ResetPassword from "./page/auth/resetP";
import Report from "./page/dashboard/report";
import Produk from "./page/dashboard/produk";
import User from "./page/dashboard/user";
import ProtectRoute from "./protect-route/protectRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/auth/reset-password/:id/:token"
        element={<ResetPassword />}
      />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboard/User"
        element={
          <ProtectRoute>
            <User />
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboard/Report"
        element={
          <ProtectRoute>
            <Report />
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboard/Produk"
        element={
          <ProtectRoute>
            <Produk />
          </ProtectRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>

    // </div>
  );
}

export default App;

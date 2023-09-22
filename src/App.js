import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/login.jsx";
import Register from "./auth/register";
import Dashboard from "./page/dashboard/dashboard";

import ForgotPassword from "./auth/forgotP";
import ResetPassword from "./auth/resetP";
import EnterItem from "./page/dashboard/EnterItem";
import Report from "./page/dashboard/report";
import OutItem from "./page/dashboard/outItem";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/auth/reset-password/:id/:token"
        element={<ResetPassword />}
      />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/EnterItem" element={<EnterItem />} />
      <Route path="/dashboard/Report" element={<Report />} />
      <Route path="/dashboard/OutItem" element={<OutItem />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>

    // </div>
  );
}

export default App;

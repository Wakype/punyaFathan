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
import Produk from "./page/dashboard/produk";
import Blog from "./page/dashboard/blog";
import User from "./page/dashboard/user";
import ForgotPassword from "./auth/forgotP";
import ResetPassword from "./auth/resetP";

function App() {
  return (
    

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/Produk" element={<Produk />} />
      <Route path="/dashboard/Blog" element={<Blog />} />
      <Route path="/dashboard/User" element={<User />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>

    // </div>
  );
}

export default App;

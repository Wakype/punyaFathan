// import logo from './logo.svg';
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Login from "./auth/login.jsx";
import Register from "./auth/register";
function App() {
  return (
    <div className="flex ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>

      <div style={{ padding: "20px" }}>

        <h1>Déploiement Full-Stack Réussi 🎉</h1>

        <nav>
          <Link to="/login">Login</Link>
          <br /><br />

          <Link to="/dashboard">Dashboard</Link>
          <br /><br />

          <Link to="/profile">Profile</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;


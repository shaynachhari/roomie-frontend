import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">QuirkyRoomie</h1>

      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/complaint" className="navbar-link">Complaint</Link>
            <Link to="/leaderboard-state" className="navbar-link">Leaderboard</Link>
            <button onClick={logout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

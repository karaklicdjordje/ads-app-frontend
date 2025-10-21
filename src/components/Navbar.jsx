import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>AdsApp</h2>
      <div>
        <Link to="/home">All Ads</Link>
        {user ? (
          <>
            <span style={{ marginLeft: '15px' }}>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

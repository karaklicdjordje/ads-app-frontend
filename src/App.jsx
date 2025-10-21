import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdsList from './components/AdsList';
import AdDetails from './components/AdDetails';
import Navbar from './components/Navbar';
import CreateAd from './components/CreateAd';
import MyAds from './components/MyAds';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-ads" element={user ? <MyAds /> : <Navigate to="/login" />} />
        <Route path="/home" element={user ? <AdsList /> : <Navigate to="/login" />} />
        <Route path="/create-ad" element={user ? <CreateAd /> : <Navigate to="/login" />} />
        <Route path="/ads/:id" element={user ? <AdDetails /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

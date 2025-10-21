import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });

      // ✅ Sačuvaj korisnika u localStorage
      localStorage.setItem('user', JSON.stringify(res.data));

      alert(`Dobrodošao ${res.data.username}!`);

      // ✅ Sada idi na home
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      alert('Pogrešan email ili lozinka');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Nisi registrovan?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Registruj se
        </span>
      </p>
    </div>
  );
};

export default Login;

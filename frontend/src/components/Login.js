import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/diary');
    } catch (err) {
      if (err.response && err.response.data) alert(err.response.data.message);
      else alert('Cannot connect to backend.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        <input style={styles.input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={styles.button} onClick={handleLogin}>Login</button>
        <p style={{ marginTop: '10px' }}>Don't have an account? <Link to="/signup" style={{ color: '#2E8B57', textDecoration: 'none' }}>Signup</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fff0',
  },
  box: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center'
  },
  title: {
    color: '#2E8B57',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2E8B57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Login;

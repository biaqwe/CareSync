import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); // to handle loading state

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      let message = '';
      if (error === 'invalid') {
        message = 'Invalid username or password.';
      }
      setErrorMsg(message);
    }
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setErrorMsg('Both fields are required');
      return;
    }
  
    setErrorMsg('');
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:8000/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful login (e.g., redirect to dashboard or set session info)
        window.location.href = '/dashboard';
      } else {
        setErrorMsg(data.message || 'An error occurred');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fadeOut">
      <div className="container">
        <form onSubmit={handleSubmit} className="input">
          <div className="formContainer">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit" id="loginBtn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <p className="message">
              Don't have an account?
              <Link to="/signup" id="showSignUpLink">Sign up!</Link>
            </p>
            {errorMsg && <div id="errorMsg">{errorMsg}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      let message = '';
      if (error === 'invalid') {
        message = 'Invalid input. Please check your details.';
      }
      setErrorMsg(message);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !firstName || !lastName || !email || !phoneNumber) {
      setErrorMsg('All required fields must be filled out');
    } else if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
    } else {
      setErrorMsg('');
      // Handle successful signup (e.g., form submission, API call)
    }
  };

  return (
    <div className="fadeOut">
      <button id="theme">
        <i className="fas fa-moon"></i>
      </button>
      <div className="container">
        <form onSubmit={handleSubmit} className="input">
          <table className="formTable">
            <tbody>
              {/* Row 1: First Name and Last Name */}
              <tr>
                <td>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </td>
              </tr>

              {/* Row 2: Email and Phone Number */}
              <tr>
                <td>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </td>
              </tr>

              {/* Row 3: Birth Date and Gender */}
              <tr>
                <td>
                  <input
                    id="birthDate"
                    type="date"
                    name="birthDate"
                    placeholder="Birth Date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </td>
              </tr>

              {/* Row 4: Address and Username */}
              <tr>
                <td>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </td>
              </tr>

              {/* Row 5: Password and Confirm Password */}
              <tr>
                <td>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>

              {/* Error message */}
              {errorMsg && (
                <tr>
                  <td colSpan="2" id="errorMsg">
                    {errorMsg}
                  </td>
                </tr>
              )}

              {/* Signup button and link */}
              <tr>
                <td colSpan="2">
                  <button type="submit" id="signupBtn">Sign up</button>
                  <p className="message">
                    Already have an account? 
                    <Link to="/login" id="showLoginLink">Log in!</Link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Signup;

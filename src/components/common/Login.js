import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPagePolice from '../police/MainPagePolice';
import MainPagePeople from '../people/MainPagePeople';
import Preloader from './Preloader';

const POLICE_CREDENTIALS = [
  { username: 'admin', password: 'police123' },
  { username: 'officer', password: 'secure456' },
  { username: 'Sreeram AM', password: 'fullstack' }
];

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const loginContainerStyle = {
    height: '100vh',
    background: 'linear-gradient(135deg, #1a2980, #26d0ce)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cardStyle = {
    width: '400px',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white'
  };

  const handlePoliceLogin = () => {
    const validUser = POLICE_CREDENTIALS.find(
      cred => cred.username === username && cred.password === password
    );

    if (validUser) {
      setIsLoggedIn(true);
      setUserType('police');
    } else {
      setError('Invalid Police Credentials');
    }
  };

  const handlePeopleView = () => {
    setIsLoggedIn(true);
    setUserType('people');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (isLoggedIn) {
    return userType === 'police' ? (
      <MainPagePolice onLogout={handleLogout} />
    ) : (
      <MainPagePeople onLogout={handleLogout} />
    );
  }

  return (
    <div style={loginContainerStyle}>
      <motion.div 
        className="card" 
        style={cardStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-header text-center">
          <ShieldCheck size={48} className="mx-auto mb-2" />
          <h2 style={{ color: 'white' }}>Secure Access Control</h2>
        </div>
        <div className="card-body">
          {!userType && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="mb-4 text-white">Select User Type</h4>
              <div className="d-flex justify-content-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-primary"
                  onClick={() => setUserType('police')}
                >
                  Police Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-success"
                  onClick={() => setUserType('people')}
                >
                  Public View
                </motion.button>
              </div>
            </motion.div>
          )}

          {userType === 'police' && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={e => {
                e.preventDefault();
                handlePoliceLogin();
              }}
            >
              <div className="mb-3 position-relative">
                <label className="form-label text-white">
                  <User size={18} className="me-2" /> Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label className="form-label text-white">
                  <Lock size={18} className="me-2" /> Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-light"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="alert alert-danger"
                >
                  {error}
                </motion.div>
              )}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="btn btn-dark w-100"
              >
                Login
              </motion.button>
            </motion.form>
          )}

          {userType === 'people' && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-success" 
                onClick={handlePeopleView}
              >
                Enter Public View
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
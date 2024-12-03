import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Camera, Shield, Search } from 'lucide-react';

const Welcome = () => {
  const welcomeStyle = {
    height: '100vh',
    background: 'linear-gradient(135deg, #1a2980, #26d0ce)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 10 },
    initial: { scale: 1, rotate: 0 }
  };

  return (
    <div style={welcomeStyle}>
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-3 mb-4 font-weight-bold"
          style={{ color: 'white' }}
        >
          Surveillance Security FRT System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lead mb-5"
          style={{ color: 'white' }}
        >
          Advanced AI / Blockchain Powered Face Recognition & Threat Detection
        </motion.p>
        
        <div className="d-flex justify-content-center mb-5">
          {[
            { Icon: Camera, label: "High-Resolution Capture" },
            { Icon: Shield, label: "Real-Time Protection" },
            { Icon: Search, label: "Intelligent Tracking" },
            { Icon: Lock, label: "Secure Authentication" }
          ].map(({ Icon, label }, index) => (
            <motion.div
              key={label}
              variants={iconVariants}
              whileHover="hover"
              initial="initial"
              className="mx-3 text-center"
            >
              <Icon size={48} strokeWidth={1.5} className="mb-2" />
              <p className="small">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {/* <button className="btn btn-outline-light btn-lg">
            Get Started
          </button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
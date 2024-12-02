import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';

const Preloader = () => {
  const preloaderStyle = {
    height: '100vh',
    background: 'linear-gradient(135deg, #1a2980, #26d0ce)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  };

  const iconVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div style={preloaderStyle}>
      <div className="text-center">
        <motion.div 
          variants={iconVariants}
          animate="animate"
          className="mb-4 d-flex justify-content-center"
        >
          <ShieldCheck size={100} strokeWidth={1.5} />
        </motion.div>
        <h2 className="mb-3">Surveillance Security System</h2>
        <div className="d-flex justify-content-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              transition: { 
                duration: 1, 
                repeat: Infinity, 
                delay: 0 
              } 
            }}
          >
            <Lock size={24} />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              transition: { 
                duration: 1, 
                repeat: Infinity, 
                delay: 0.3 
              } 
            }}
          >
            <Lock size={24} />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              transition: { 
                duration: 1, 
                repeat: Infinity, 
                delay: 0.6 
              } 
            }}
          >
            <Lock size={24} />
          </motion.div>
        </div>
        <p className="mt-3">Initializing...</p>
      </div>
    </div>
  );
};

export default Preloader;
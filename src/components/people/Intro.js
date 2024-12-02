import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Intro = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 mb-4">Welcome to Our Platform</h1>
          <p className="lead text-muted mb-5">
            Empowering communities through advanced surveillance and intelligent monitoring technologies.
          </p>
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-3">Our Mission</h3>
              <p>
                We are committed to enhancing public safety through cutting-edge face recognition and intelligent monitoring systems. 
                Our technology bridges the gap between security and community well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
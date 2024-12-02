import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Privacy = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h2 className="text-center mb-4">Privacy & Data Protection</h2>
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Our Privacy Commitment</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Data Minimization:</strong> We collect only essential information required for security purposes.
                </li>
                <li className="list-group-item">
                  <strong>Secure Storage:</strong> All data is encrypted and stored with highest security standards.
                </li>
                <li className="list-group-item">
                  <strong>Limited Access:</strong> Data access is strictly controlled and monitored.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
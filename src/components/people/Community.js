import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Community = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h2 className="mb-4">Community Engagement</h2>
          <div className="card bg-light shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Building Trust Together</h4>
              <p>
                We believe in transparent communication and collaborative approach 
                to community safety. Our technology is designed with respect and 
                dignity for all community members.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5>Open Dialogue</h5>
                      <p>Regular community meetings and feedback sessions.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5>Ethical Monitoring</h5>
                      <p>Strict guidelines to protect individual privacy.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5>Continuous Improvement</h5>
                      <p>Adapting our systems based on community feedback.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
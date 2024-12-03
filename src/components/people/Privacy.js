import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Lock, ShieldCheck, Database, Eye, Globe, UserCheck } from 'lucide-react';

const Privacy = () => {
  const privacyFeatures = [
    {
      icon: Lock,
      title: 'Data Minimization',
      description: 'We collect only essential information directly relevant to public safety, minimizing personal data exposure.',
      details: 'Our AI-powered system captures only critical facial recognition markers, discarding unnecessary personal details.'
    },
    {
      icon: ShieldCheck,
      title: 'Advanced Encryption',
      description: 'Military-grade encryption protects all stored data, ensuring maximum security and privacy.',
      details: 'Utilizing 256-bit AES encryption with multi-layered security protocols to prevent unauthorized access.'
    },
    {
      icon: Database,
      title: 'Controlled Data Retention',
      description: 'Strict policies govern data storage, with automatic deletion of non-critical information.',
      details: 'Facial data is securely anonymized and automatically purged after investigative requirements are met.'
    },
    {
      icon: Eye,
      title: 'Transparent Monitoring',
      description: 'Comprehensive audit trails track every data access point and interaction.',
      details: 'Real-time logging ensures complete accountability for all system interactions.'
    },
    {
      icon: Globe,
      title: 'Global Privacy Compliance',
      description: 'Adherence to international data protection regulations and privacy standards.',
      details: 'Fully compliant with GDPR, CCPA, and other global data protection frameworks.'
    },
    {
      icon: UserCheck,
      title: 'Individual Rights Protection',
      description: 'Empowering individuals with complete control and transparency over their data.',
      details: 'Individuals can request data review, modification, and complete deletion at any time.'
    }
  ];

  const societalBenefits = [
    'Proactive crime prevention through intelligent monitoring',
    'Rapid response to potential security threats',
    'Enhanced public safety without compromising individual privacy',
    'Reduction in criminal activities through deterrence',
    'Support for law enforcement in solving complex cases',
    'Creating safer community environments'
  ];

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="text-center mb-5">Privacy & Data Protection Framework</h2>
          
          <div className="row g-4 mb-5">
            {privacyFeatures.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <feature.icon size={48} className="mb-3 text-primary" />
                    <h4 className="card-title mb-3">{feature.title}</h4>
                    <p className="text-muted">{feature.description}</p>
                    <small className="text-secondary">{feature.details}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h4 className="card-title mb-4">Societal Impact of Responsible Surveillance</h4>
                  <ul className="list-group list-group-flush">
                    {societalBenefits.map((benefit, index) => (
                      <li key={index} className="list-group-item d-flex align-items-center">
                        <ShieldCheck size={20} className="me-2 text-success" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h4 className="card-title mb-4">Our Ethical Commitment</h4>
                  <p className="text-muted">
                    SafeGuard Intelligence Platform is dedicated to balancing technological innovation 
                    with stringent privacy protections. Our mission is to enhance public safety through 
                    responsible, transparent, and ethical use of advanced surveillance technologies.
                  </p>
                  <div className="alert alert-info mt-3" role="alert">
                    <strong>Key Principles:</strong>
                    <ul className="mt-2">
                      <li>Transparency in Data Usage</li>
                      <li>Minimal Intrusion</li>
                      <li>Continuous Ethical Assessment</li>
                      <li>Individual Rights Preservation</li>
                    </ul>
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

export default Privacy;
import React from 'react';
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
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          Privacy & Data Protection Framework
        </h2>
        
        {/* Privacy Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {privacyFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-6"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <feature.icon 
                    size={48} 
                    className="text-blue-600 bg-blue-100 rounded-full p-3"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 mb-3">
                  {feature.description}
                </p>
                <small className="text-gray-500 text-sm">
                  {feature.details}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Societal Impact of Responsible Surveillance
            </h4>
            <ul className="space-y-3">
              {societalBenefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-700"
                >
                  <ShieldCheck 
                    size={20} 
                    className="mr-3 text-green-500 flex-shrink-0"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Our Ethical Commitment
            </h4>
            <p className="text-gray-600 mb-4">
              SafeGuard Intelligence Platform is dedicated to balancing technological 
              innovation with stringent privacy protections. Our mission is to enhance 
              public safety through responsible, transparent, and ethical use of 
              advanced surveillance technologies.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <strong className="text-blue-800 block mb-2">Key Principles:</strong>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
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
  );
};

export default Privacy;
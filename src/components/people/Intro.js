import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  ShieldCheck, Users, Camera, AlertTriangle, 
  Target, Lock, Globe, Gauge, Briefcase, 
  Database, Headphones, BookOpen, Zap, 
  TrendingUp 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line 
} from 'recharts';
import './Intro.css';

const crimeData = [
  { year: '2020', total: 2320539, solved: 628454, unsolved: 1692085 },
  { year: '2021', total: 2227285, solved: 672187, unsolved: 1555098 },
  { year: '2022', total: 2395822, solved: 715346, unsolved: 1680476 }
];

const technologyImpactData = [
  { name: 'Crime Detection', value: 65 },
  { name: 'Prevention', value: 25 },
  { name: 'Investigation Speed', value: 10 }
];

const performanceMetricsData = [
  { metric: 'Accuracy', value: 98 },
  { metric: 'Response Time', value: 92 },
  { metric: 'Privacy Protection', value: 95 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Intro = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const featuresData = [
    {
      icon: Camera,
      title: 'Advanced Facial Recognition',
      description: 'Cutting-edge AI-powered facial recognition with 98% accuracy and real-time matching capabilities.',
      details: 'Utilizes deep learning neural networks to identify and track individuals across multiple data sources.'
    },
    {
      icon: AlertTriangle,
      title: 'Predictive Threat Detection',
      description: 'Machine learning algorithms that anticipate potential security risks before they escalate.',
      details: 'Analyzes complex behavioral patterns and historical data to generate proactive threat assessments.'
    },
    {
      icon: Users,
      title: 'Community Safety Network',
      description: 'Integrated platform connecting law enforcement, community stakeholders, and technological resources.',
      details: 'Creates a collaborative ecosystem for rapid information sharing and coordinated response strategies.'
    }
  ];

  return (
    <div className="bg-gradient-primary text-dark py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="text-center mb-5 p-4 bg-white rounded shadow-lg">
              <h1 className="display-4 text-primary mb-3">
                <ShieldCheck size={54} className="me-3 text-primary" />
                SafeGuard Intelligence Platform
              </h1>
              <p className="lead text-muted">
                Revolutionizing Public Safety through Cutting-Edge Technological Interventions
              </p>
            </div>

            {/* Detailed Organizational Overview */}
            <div className="row g-4 mb-5">
              {[
                {
                  icon: Target,
                  title: 'Mission Scope',
                  description: 'Implement comprehensive technological solutions that transform public safety ecosystems through intelligent monitoring, predictive analytics, and real-time threat assessment capabilities.'
                },
                {
                  icon: Globe,
                  title: 'Strategic Vision',
                  description: 'Create a proactive, technology-driven safety network that seamlessly integrates advanced facial recognition, machine learning, and data analytics to prevent and mitigate potential security risks.'
                },
                {
                  icon: Lock,
                  title: 'Ethical Framework',
                  description: 'Maintain rigorous privacy standards, transparent operational protocols, and continuous ethical assessments to ensure individual rights are protected while enhancing community security.'
                }
              ].map(({ icon: Icon, title, description }, index) => (
                <div key={index} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <Icon size={48} className={`mb-3 text-${['primary', 'success', 'warning'][index]}`} />
                      <h3 className="card-title mb-3">{title}</h3>
                      <p className="text-muted">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Features Section */}
            <div className="col-12 mb-5">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">
                    <Zap className="me-2 text-warning" /> Key Innovation Features
                  </h3>
                  <div className="row">
                    {featuresData.map((feature, index) => (
                      <div 
                        key={index} 
                        className="col-md-4 mb-3"
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={() => setActiveFeature(null)}
                      >
                        <div className={`card h-100 ${activeFeature === index ? 'border-primary' : ''}`}>
                          <div className="card-body text-center">
                            <feature.icon size={48} className={`mb-3 text-${['primary', 'success', 'warning'][index]}`} />
                            <h4 className="card-title">{feature.title}</h4>
                            <p className="text-muted">{feature.description}</p>
                            {activeFeature === index && (
                              <div className="mt-3 text-secondary small">
                                {feature.details}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistical Visualizations */}
            <div className="row mb-5">
              <div className="col-md-8">
                <div className="card shadow-lg h-100">
                  <div className="card-body">
                    <h4 className="card-title text-center mb-4">India's Crime Statistics (2020-2022)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={crimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" name="Total Crimes" />
                        <Bar dataKey="solved" fill="#82ca9d" name="Solved Crimes" />
                        <Bar dataKey="unsolved" fill="#ff7300" name="Unsolved Crimes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-lg h-100">
                  <div className="card-body">
                    <h4 className="card-title text-center mb-4">Technology Impact</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={technologyImpactData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {technologyImpactData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics Section */}
            <div className="col-12 mb-5">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">
                    <TrendingUp className="me-2 text-success" /> Performance Metrics
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceMetricsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="row mt-4">
                    {performanceMetricsData.map((metric, index) => (
                      <div key={index} className="col-md-4 text-center">
                        <h5>{metric.metric}</h5>
                        <div className="progress">
                          <div 
                            className={`progress-bar bg-${['primary', 'success', 'warning'][index]}`} 
                            role="progressbar" 
                            style={{width: `${metric.value}%`}}
                          >
                            {metric.value}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Technology Overview */}
            <div className="card shadow-lg mb-5">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Technological Ecosystem</h3>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-primary mb-3">
                      <Briefcase className="me-2" /> Operational Capabilities
                    </h5>
                    <ul className="list-unstyled">
                      {[
                        'Advanced Facial Recognition (98% Accuracy)',
                        'Real-Time Threat Detection',
                        'Predictive Crime Analytics',
                        'Multi-Layered Security Protocols'
                      ].map((capability, index) => (
                        <li key={index} className="mb-2">
                          <Gauge size={20} className="me-2 text-success" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-primary mb-3">
                      <Database className="me-2" /> Data Management
                    </h5>
                    <ul className="list-unstyled">
                      {[
                        'Encrypted Data Storage',
                        'Secure Cloud Infrastructure',
                        'Minimal Personal Information Retention',
                        'Regular Privacy Audits'
                      ].map((feature, index) => (
                        <li key={index} className="mb-2">
                          <Lock size={20} className="me-2 text-warning" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Implementation Strategy */}
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Implementation Strategy</h3>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-primary mb-3">
                      <BookOpen className="me-2" /> Problem Analysis
                    </h5>
                    <p className="text-muted">
                      India confronts substantial public safety challenges, with over 2.3 million 
                      annual reported crimes and limited resolution capabilities due to traditional 
                      investigative methodologies and resource constraints.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-primary mb-3">
                      <Headphones className="me-2" /> Technological Solution
                    </h5>
                    <p className="text-muted">
                      Our integrated solution leverages AI-driven facial recognition, machine learning 
                      algorithms, and comprehensive data analytics to enhance crime detection, 
                      reduce investigation timelines, and provide actionable insights for 
                      law enforcement agencies.
                    </p>
                  </div>
                </div>
                <div className="alert alert-info mt-4" role="alert">
                  <strong>Key Deployment Principles:</strong>
                  <ul className="mt-2">
                    <li>Collaborative Law Enforcement Partnerships</li>
                    <li>Continuous Technological Evolution</li>
                    <li>Stringent Ethical Standards</li>
                    <li>Transparent Community Engagement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
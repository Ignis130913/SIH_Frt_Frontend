import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Nav, Card, Spinner, Alert } from 'react-bootstrap';
import { UploadCloud, Upload, BarChart, Activity, Shield, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  Users, 
  Lightbulb, 
  Brain, 
  Cloud, 
  Layout, 
  Bitcoin,
  GraduationCap,
  Trophy,
  Target,
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Network, 
  Server, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Badge
} from 'lucide-react';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('predictions');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'predictions':
        return <Predictions />;
      case 'upload':
        return <UploadComponent />;
      case 'status':
        return <ServerStatus />;
      case 'security':
        return <ServerSecurity />;
      case 'about':
        return <AboutUs />;
      default:
        return <Predictions />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="bg-dark text-light min-vh-100 p-0">
          <div className="p-3 border-bottom border-secondary">
            <h2 className="h4 mb-0">FRT Dashboard</h2>
          </div>
          <Nav className="flex-column p-3">
            <SidebarItem
              icon={<BarChart size={20} />}
              text="Monitoring"
              active={selectedComponent === 'predictions'}
              onClick={() => setSelectedComponent('predictions')}
            />
            <SidebarItem
              icon={<Upload size={20} />}
              text="Upload Person"
              active={selectedComponent === 'upload'}
              onClick={() => setSelectedComponent('upload')}
            />
            <SidebarItem
              icon={<Activity size={20} />}
              text="Server Status"
              active={selectedComponent === 'status'}
              onClick={() => setSelectedComponent('status')}
            />
            <SidebarItem
              icon={<Shield size={20} />}
              text="Server Security"
              active={selectedComponent === 'security'}
              onClick={() => setSelectedComponent('security')}
            />
            <SidebarItem
              icon={<Info size={20} />}
              text="About Us"
              active={selectedComponent === 'about'}
              onClick={() => setSelectedComponent('about')}
            />
          </Nav>
        </Col>
        <Col md={9} lg={10} className="bg-light p-4">
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <Nav.Link
    onClick={onClick}
    className={`d-flex align-items-center gap-2 mb-2 ${
      active ? 'bg-primary text-white rounded' : 'text-light'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Nav.Link>
);

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const startPredictions = async () => {
    try {
      await fetch('http://127.0.0.1:5000/start_predictions', { method: 'POST' });
      setIsStreaming(true);
    } catch (error) {
      console.error('Failed to start predictions:', error);
    }
  };

  const stopPredictions = async () => {
    try {
      await fetch('http://127.0.0.1:5000/stop_predictions', { method: 'POST' });
      setIsStreaming(false);
    } catch (error) {
      console.error('Failed to stop predictions:', error);
    }
  };

  useEffect(() => {
    if (isStreaming) {
      const eventSource = new EventSource('http://127.0.0.1:5000/predict');

      eventSource.onmessage = (event) => {
        if (event.data) {
          try {
            const prediction = JSON.parse(event.data);
            setPredictions(prev => [prediction, ...prev]);
          } catch (error) {
            console.error('Error parsing prediction:', error);
          }
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
        setIsStreaming(false);
      };

      return () => eventSource.close();
    }
  }, [isStreaming]);

  return (
    <div className="container-fluid p-4">
      <div className="row mb-3">
        <div className="col">
          {!isStreaming ? (
            <button
              className="btn btn-primary btn-lg w-100 shadow-sm"
              onClick={startPredictions}
            >
              Start Predictions
            </button>
          ) : (
            <button
              className="btn btn-danger btn-lg w-100 shadow-sm"
              onClick={stopPredictions}
            >
              Stop Predictions
            </button>
          )}
        </div>
      </div>
  
      <div className="row">
        {predictions.map((prediction, index) => {
          if (!prediction.original_image || !prediction.predicted_image) {
            return null;
          }
  
          return (
            <div key={index} className="col-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <strong>Prediction from {new Date(prediction.timestamp).toLocaleString()}</strong>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Original Image</h5>
                      <img
                        src={`data:image/jpeg;base64,${prediction.original_image}`}
                        className="img-fluid rounded shadow-sm mb-3"
                        alt="Original"
                      />
                    </div>
                    <div className="col-md-6">
                      <h5>Predicted Image</h5>
                      <img
                        src={`data:image/jpeg;base64,${prediction.predicted_image}`}
                        className="img-fluid rounded shadow-sm mb-3"
                        alt="Predicted"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h5>Prediction Details</h5>
                      <pre className="bg-light p-3 rounded shadow-sm">
                        {JSON.stringify(prediction.prediction, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};  

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name) {
      setMessage('Please provide both image and name');
      setVariant('danger');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/save_train_data', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'File uploaded successfully');
        setVariant('success');
        setFile(null);
        setName('');
      } else {
        setMessage(data.error || 'Error uploading file');
        setVariant('danger');
      }
    } catch (error) {
      setMessage('Error connecting to the server');
      setVariant('danger');
    } finally {
      setLoading(false);
    }
  };

  const requirements = [
    'Face must be clear.',
    'Have the face as the main subject.',
    'Well-lit (no shadows obscuring features).',
    'Have a resolution of at least 256x256 pixels.',
    'Be in JPEG or PNG format.',
    'Not exceed 5MB in size.',
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Training Data</h2>
      
      <CustomCard>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name for the image"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-blue-500">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <UploadCloud 
                    size={40} 
                    className={`mb-3 ${file ? 'text-blue-500' : 'text-gray-400'}`} 
                  />
                  <span className={`text-sm ${file ? 'text-blue-500' : 'text-gray-500'}`}>
                    {file ? file.name : 'Click to upload image'}
                  </span>
                </label>
              </div>

              {/* Requirements */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Image Requirements:</span>
                </div>
                <ul className="space-y-1 ml-6">
                  {requirements.map((req, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </span>
              ) : 'Upload'}
            </button>

            {/* Alert Message */}
            {message && (
              <div className={`mt-4 p-4 rounded-md flex items-center gap-2
                ${variant === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {variant === 'success' 
                  ? <CheckCircle2 size={20} className="text-green-500" />
                  : <AlertCircle size={20} className="text-red-500" />
                }
                {message}
              </div>
            )}
          </form>
        </div>
      </CustomCard>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, subValue, color = 'primary' }) => (
  <Card className={`mb-3 border-0 shadow-sm bg-${color}-subtle`}>
    <Card.Body className="d-flex align-items-center">
      <div className="me-3">
        <Icon className={`text-${color}`} size={40} />
      </div>
      <div>
        <h6 className="text-muted mb-1">{title}</h6>
        <h4 className="mb-0">{value}</h4>
        {subValue && <small className="text-muted">{subValue}</small>}
    </div>
  </Card.Body>
  </Card>
);

const ProgressBar = ({ percent, color = 'primary' }) => (
  <div className="progress" style={{ height: '6px' }}>
    <div 
      className={`progress-bar bg-${color}`} 
      role="progressbar" 
      style={{ width: `${percent}%` }}
      aria-valuenow={percent}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
);

const ServerStatus = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/get_server_status');
        const data = await response.json();

        if (data.status === 'success') {
          setMetrics(data.system_metrics);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to fetch server status');
        }
      } catch (err) {
        setError(err.message);
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServerStatus();
    const intervalId = setInterval(fetchServerStatus, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="d-flex align-items-center">
        <AlertTriangle className="me-2" />
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Server Status</h2>
      <Row>
        <Col md={4}>
          <MetricCard 
            icon={Cpu}
            title="CPU Usage"
            value={`${metrics.cpu.percent_usage}%`}
            subValue={`${metrics.cpu.cores} Physical / ${metrics.cpu.logical_cores} Logical Cores`}
            color="warning"
          />
          <ProgressBar percent={metrics.cpu.percent_usage} color="warning" />
        </Col>

        <Col md={4}>
          <MetricCard 
            icon={MemoryStick}
            title="Memory"
            value={`${metrics.memory.used} / ${metrics.memory.total}`}
            subValue={`${metrics.memory.percent}% Used`}
            color="info"
          />
          <ProgressBar percent={metrics.memory.percent} color="info" />
        </Col>

        <Col md={4}>
          <MetricCard 
            icon={HardDrive}
            title="Disk"
            value={`${metrics.disk.used} / ${metrics.disk.total}`}
            subValue={`${metrics.disk.percent}% Used`}
            color="danger"
          />
          <ProgressBar percent={metrics.disk.percent} color="danger" />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Header>Network Metrics</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <Network className="me-2 text-success" size={20} />
                  <span>Bytes Sent</span>
                </div>
                <span>{metrics.network.bytes_sent.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Network className="me-2 text-primary" size={20} />
                  <span>Bytes Received</span>
                </div>
                <span>{metrics.network.bytes_recv.toLocaleString()}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>System Information</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <Server className="me-2 text-secondary" size={20} />
                  <span>Operating System</span>
                </div>
                <span>{metrics.system.os}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <Server className="me-2 text-secondary" size={20} />
                  <span>Release</span>
                </div>
                <span>{metrics.system.release}</span>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Server className="me-2 text-secondary" size={20} />
                  <span>Processor</span>
                </div>
                <span>{metrics.system.processor}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const ServerSecurity = () => {
  const [securityMetrics, setSecurityMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecurityMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:5000/get_security_status');
        
        if (!response.ok) {
          throw new Error('Failed to fetch security metrics');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setSecurityMetrics(data.security_metrics);
          setError(null);
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }
      } catch (err) {
        setError(err.message);
        setSecurityMetrics(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecurityMetrics();
    // Refresh every 5 minutes
    const intervalId = setInterval(fetchSecurityMetrics, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderNetworkConnections = () => {
    if (!securityMetrics?.network_connections) return null;
    
    const { total_connections, established, listening } = securityMetrics.network_connections;
    
    return (
      <Card className="mb-3">
        <Card.Header className="d-flex align-items-center">
          <Network className="me-2" />
          <strong>Network Connections</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Badge bg="primary" className="me-2">
                Total: {total_connections}
              </Badge>
              <Badge bg="success" className="me-2">
                Established: {established}
              </Badge>
              <Badge bg="info">
                Listening: {listening}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const renderFirewallStatus = () => {
    if (!securityMetrics?.firewall) return null;
    
    const { status, active, error } = securityMetrics.firewall;
    
    return (
      <Card className="mb-3">
        <Card.Header className="d-flex align-items-center">
          <Shield className="me-2" />
          <strong>Firewall Status</strong>
        </Card.Header>
        <Card.Body>
          {error ? (
            <Alert variant="danger">
              <XCircle className="me-2" />
              Error fetching firewall status: {error}
            </Alert>
          ) : (
            <div>
              {active ? (
                <Badge bg="success" className="d-flex align-items-center">
                  <CheckCircle className="me-2" /> Active
                </Badge>
              ) : (
                <Badge bg="danger" className="d-flex align-items-center">
                  <AlertTriangle className="me-2" /> Inactive
                </Badge>
              )}
              <small className="text-muted d-block mt-2">{status}</small>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderOpenPorts = () => {
    if (!securityMetrics?.open_ports) return null;
    
    const { total_open_ports, ports_details, error } = securityMetrics.open_ports;
    
    return (
      <Card>
        <Card.Header className="d-flex align-items-center">
          <Server className="me-2" />
          <strong>Open Ports</strong>
        </Card.Header>
        <Card.Body>
          {error ? (
            <Alert variant="danger">
              <XCircle className="me-2" />
              Error fetching open ports: {error}
            </Alert>
          ) : (
            <>
              <Badge bg="primary" className="mb-3">
                Total Open Ports: {total_open_ports}
              </Badge>
              {ports_details && ports_details.length > 0 && (
                <div className="overflow-auto" style={{ maxHeight: '200px' }}>
                  <pre className="small text-muted">{ports_details.join('\n')}</pre>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        <AlertTriangle className="me-2" />
        Failed to load security metrics: {error}
      </Alert>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Server Security Dashboard</h2>
      <Row>
        <Col md={4}>
          {renderNetworkConnections()}
        </Col>
        <Col md={4}>
          {renderFirewallStatus()}
        </Col>
        <Col md={4}>
          {renderOpenPorts()}
        </Col>
      </Row>
    </div>
  );
};

const CustomCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const AboutUs = () => {
  const teamMembers = [
    { 
      name: "Sreeram A M", 
      role: "Machine Learning, Cloud Infrastructure, Cybersecurity, Frontend, Blockchain",
      skills: [
        { icon: <Brain className="w-4 h-4" />, skill: "Machine Learning" },
        { icon: <Cloud className="w-4 h-4" />, skill: "Cloud Infrastructure" },
        { icon: <Shield className="w-4 h-4" />, skill: "Cybersecurity" },
        { icon: <Layout className="w-4 h-4" />, skill: "Frontend" },
        { icon: <Bitcoin className="w-4 h-4" />, skill: "Blockchain" }
      ]
    },
    { 
      name: "Tejasvi J", 
      role: "Machine Learning",
      skills: [
        { icon: <Brain className="w-4 h-4" />, skill: "Machine Learning" }
      ]
    },
    { 
      name: "Steve Joshua S", 
      role: "Cloud Infrastructure",
      skills: [
        { icon: <Cloud className="w-4 h-4" />, skill: "Cloud Infrastructure" }
      ]
    },
    { 
      name: "Varshini M S", 
      role: "Machine Learning",
      skills: [
        { icon: <Brain className="w-4 h-4" />, skill: "Machine Learning" }
      ]
    },
    { 
      name: "Karthika Shree K T", 
      role: "Frontend",
      skills: [
        { icon: <Layout className="w-4 h-4" />, skill: "Frontend" }
      ]
    },
    { 
      name: "Nesapriya N", 
      role: "Frontend",
      skills: [
        { icon: <Layout className="w-4 h-4" />, skill: "Frontend" }
      ]
    }
  ];

  const mentors = [
    { 
      name: "Shanthini S",
      achievements: "Project Mentor"
    },
    { 
      name: "Perumal Raja",
      achievements: "Project Mentor"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <Target className="w-6 h-6" />
          <span className="text-lg">Building the Future of Security</span>
        </div>
      </div>
      
      {/* Project Overview */}
      <div className="mb-12">
        <CustomCard className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Project Overview</h3>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
              Our project aims to build a blockchain-powered facial recognition technology (FRT) for police departments. 
              This system integrates advanced security measures with blockchain to ensure privacy, reliability, and 
              transparency in operations.
            </p>
          </div>
        </CustomCard>
      </div>

      {/* Team Members */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-800">Our Team</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <CustomCard key={index} className="transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                  </div>
                </div>
                <div className="space-y-2">
                  {member.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                      {skill.icon}
                      <span className="text-sm">{skill.skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CustomCard>
          ))}
        </div>
      </div>

      {/* Mentors */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-800">Our Mentors</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor, index) => (
            <CustomCard key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {mentor.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">{mentor.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Trophy className="w-4 h-4" />
                      <p className="text-sm">{mentor.achievements}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>
      </div>
    </div>
  );
};


export default App;

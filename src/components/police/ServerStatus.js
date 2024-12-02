import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Network, 
  Server, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, subValue, color = 'primary', extra = null }) => (
  <Card className={`mb-3 border-0 shadow-sm bg-${color}-subtle h-100`}>
    <Card.Body className="d-flex align-items-center">
      <div className="me-3">
        <Icon className={`text-${color}`} size={40} />
      </div>
      <div className="flex-grow-1">
        <h6 className="text-muted mb-1">{title}</h6>
        <h4 className="mb-0">{value}</h4>
        {subValue && <small className="text-muted">{subValue}</small>}
      </div>
      {extra}
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
    const intervalId = setInterval(fetchServerStatus, 30000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="d-flex align-items-center">
          <AlertTriangle className="me-2" />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Server Dashboard</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Resource Overview</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <MetricCard 
                    icon={Cpu}
                    title="CPU Usage"
                    value={`${metrics.cpu.percent_usage}%`}
                    subValue={`${metrics.cpu.cores} Physical / ${metrics.cpu.logical_cores} Logical Cores`}
                    color="warning"
                    extra={<ChevronRight className="text-muted" />}
                  />
                  <ProgressBar percent={metrics.cpu.percent_usage} color="warning" />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <MetricCard 
                    icon={MemoryStick}
                    title="Memory"
                    value={`${metrics.memory.used} / ${metrics.memory.total}`}
                    subValue={`${metrics.memory.percent}% Used`}
                    color="info"
                    extra={<ChevronRight className="text-muted" />}
                  />
                  <ProgressBar percent={metrics.memory.percent} color="info" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Storage & Disk</Card.Header>
            <Card.Body>
              <MetricCard 
                icon={HardDrive}
                title="Disk Usage"
                value={`${metrics.disk.used} / ${metrics.disk.total}`}
                subValue={`${metrics.disk.percent}% Used`}
                color="danger"
                extra={<ChevronRight className="text-muted" />}
              />
              <ProgressBar percent={metrics.disk.percent} color="danger" />
              
              <div className="mt-3">
                <Card className="border-light">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Server className="me-2 text-secondary" size={20} />
                      <span>Disk Partitions</span>
                    </div>
                    <span className="badge bg-secondary">3 Mounted</span>
                  </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Network Metrics</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Network className="me-2 text-success" size={20} />
                  <span>Bytes Sent</span>
                </div>
                <span>{metrics.network.bytes_sent.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Network className="me-2 text-primary" size={20} />
                  <span>Bytes Received</span>
                </div>
                <span>{metrics.network.bytes_recv.toLocaleString()}</span>
              </div>
              <Card className="border-light">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Server className="me-2 text-secondary" size={20} />
                    <span>Connection Status</span>
                  </div>
                  <span className="badge bg-success">Active</span>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
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
        <Col md={6}>
          <Card>
            <Card.Header>Performance Summary</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Average CPU Load</span>
                <strong>{metrics.cpu.percent_usage}%</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Memory Utilization</span>
                <strong>{metrics.memory.percent}%</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Disk Usage</span>
                <strong>{metrics.disk.percent}%</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServerStatus;
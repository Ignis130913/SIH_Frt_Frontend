import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

const Criminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const response = await fetch('http://34.192.156.219:5000/criminals');
        if (!response.ok) {
          throw new Error('Failed to fetch criminals');
        }
        const data = await response.json();
        setCriminals(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCriminals();
  }, []);

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 bg-light">
      <h1 className="text-center mb-5 display-4">Required Data Profiles</h1>
      {criminals.map((criminal, index) => (
        <Card key={index} className="mb-4 shadow-sm">
          <Row className="g-0">
            <Col md={4} className="d-flex align-items-center justify-content-center p-3">
              <Card.Img 
                src={criminal.image} 
                alt={criminal.name}
                className="img-fluid rounded"
                style={{
                  maxHeight: '400px', 
                  objectFit: 'cover', 
                  width: '100%'
                }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">{criminal.name}</h2>
                  <Badge bg="danger" className="fs-6">Suspect</Badge>
                </Card.Title>
                <hr />
                <Row className="mt-3">
                  <Col md={6}>
                    <h5 className="text-muted">Reason for Suspicion</h5>
                    <p className="lead">{criminal.reason}</p>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-muted">Additional Details</h5>
                    <ul className="list-unstyled">
                      <li><strong>Status:</strong> Wanted</li>
                      <li><strong>Profile Created:</strong> {new Date().toLocaleDateString()}</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default Criminals;
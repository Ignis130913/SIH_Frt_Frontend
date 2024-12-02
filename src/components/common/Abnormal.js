import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Badge, Alert } from 'react-bootstrap';
import { 
  PlayCircle, 
  StopCircle, 
  AlertTriangle, 
  ShieldAlert 
} from 'lucide-react';

const Abnormal = () => {
  const [results, setResults] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState(null);

  const startMonitoring = async () => {
    try {
      await axios.post('http://localhost:5000/start_abnormal_results', {
        base_path: '/path/to/your/base/folder'
      });
      setIsMonitoring(true);
      setError(null);
    } catch (error) {
      console.error('Error starting monitoring:', error);
      setError('Unable to start monitoring. Please check system connectivity.');
    }
  };

  const stopMonitoring = async () => {
    try {
      await axios.post('http://localhost:5000/end_abnormal_results');
      setIsMonitoring(false);
      setResults([]);
      setError(null);
    } catch (error) {
      console.error('Error stopping monitoring:', error);
      setError('Unable to stop monitoring. Please try again.');
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/abnormal_results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isMonitoring) {
      intervalId = setInterval(fetchResults, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isMonitoring]);

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'HIGH':
        return <Badge bg="danger">High Priority</Badge>;
      case 'MEDIUM':
        return <Badge bg="warning">Medium Priority</Badge>;
      default:
        return <Badge bg="secondary">Low Priority</Badge>;
    }
  };

  return (
    <div className="container-fluid bg-light p-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="text-dark mb-3">
            <ShieldAlert size={32} className="mr-2 text-primary" />
            Abnormal Activity Detection
          </h2>
        </div>
        <div className="col-md-6 text-right">
          <button 
            className={`btn ${isMonitoring ? 'btn-outline-danger' : 'btn-outline-success'} btn-lg`}
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
          >
            {isMonitoring ? 
              <><StopCircle className="mr-2" /> Stop Monitoring</> : 
              <><PlayCircle className="mr-2" /> Start Monitoring</>
            }
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <AlertTriangle className="mr-2" /> {error}
        </Alert>
      )}

      {results.length === 0 && !isMonitoring && (
        <div className="text-center py-5">
          <p className="text-muted">No abnormal activities detected. Click 'Start Monitoring' to begin.</p>
        </div>
      )}

      <div className="row">
        {results.map((result, index) => (
          <div key={index} className="col-md-6 mb-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                <span>Location: {result.folder}</span>
                {getPriorityBadge(result.priority || 'LOW')}
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <Card.Img 
                      variant="top" 
                      src={`data:image/jpeg;base64,${result.image}`} 
                      className="img-fluid rounded shadow-sm mb-3"
                    />
                  </div>
                  <div className="col-md-6">
                    <Card.Title>Detection Details</Card.Title>
                    <table className="table table-sm">
                      <tbody>
                        {Object.entries(result.json_data).map(([key, value]) => (
                          <tr key={key}>
                            <th className="text-muted">{key}</th>
                            <td>{JSON.stringify(value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abnormal;
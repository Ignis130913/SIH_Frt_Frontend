import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Shield, 
  Server, 
  CheckCircle,
  XCircle
} from 'lucide-react';

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
    const intervalId = setInterval(fetchSecurityMetrics, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Shield className="mr-2 text-blue-600" />
        Server Security
      </h2>
      
      <div className="grid gap-4">
        {/* Network Connections */}
        {securityMetrics?.network_connections && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Network className="mr-2 text-blue-500" />
              <h3 className="font-semibold">Network Connections</h3>
            </div>
            <div className="space-y-1">
              <p>Total: {securityMetrics.network_connections.total_connections}</p>
              <p>Established: {securityMetrics.network_connections.established}</p>
              <p>Listening: {securityMetrics.network_connections.listening}</p>
            </div>
          </div>
        )}

        {/* Firewall Status */}
        {securityMetrics?.firewall && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Shield className="mr-2 text-blue-500" />
              <h3 className="font-semibold">Firewall Status</h3>
            </div>
            <div className="flex items-center">
              {securityMetrics.firewall.active ? (
                <CheckCircle className="mr-2 text-green-500" />
              ) : (
                <XCircle className="mr-2 text-red-500" />
              )}
              <span>{securityMetrics.firewall.active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        )}

        {/* Open Ports */}
        {securityMetrics?.open_ports && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Server className="mr-2 text-blue-500" />
              <h3 className="font-semibold">Open Ports</h3>
            </div>
            <p>Total Open Ports: {securityMetrics.open_ports.total_open_ports}</p>
            {securityMetrics.open_ports.ports_details && (
              <div className="mt-2 text-sm text-gray-600 max-h-20 overflow-y-auto">
                {securityMetrics.open_ports.ports_details.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerSecurity;
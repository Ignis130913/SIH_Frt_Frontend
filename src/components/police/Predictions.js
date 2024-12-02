import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, Video } from 'lucide-react';

const PredictionCard = ({ prediction }) => {
  const renderMetadataItem = (icon, label, value) => (
    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
      {icon}
      <div>
        <p className="text-xs font-semibold text-gray-600">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-4">
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Video size={24} />
          <span className="font-bold">Surveillance Prediction</span>
        </div>
        <span className="text-sm">
          {new Date(prediction.timestamp).toLocaleString()}
        </span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <div>
          <h5 className="text-lg font-semibold mb-2">Original Image</h5>
          <img
            src={`data:image/jpeg;base64,${prediction.original_image}`}
            className="w-full rounded-lg shadow-sm"
            alt="Original Surveillance"
          />
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-2">Predicted Image</h5>
          <img
            src={`data:image/jpeg;base64,${prediction.predicted_image}`}
            className="w-full rounded-lg shadow-sm"
            alt="Prediction Result"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-4 border-t">
        <div className="grid md:grid-cols-2 gap-4">
          {renderMetadataItem(
            <Clock className="text-blue-600" />, 
            'Timestamp', 
            new Date(prediction.timestamp).toLocaleString()
          )}
          {renderMetadataItem(
            <MapPin className="text-green-600" />, 
            'Location', 
            `${prediction.metadata.Place}`
          )}
          {renderMetadataItem(
            <Navigation className="text-red-600" />, 
            'Coordinates', 
            `Latitude: ${prediction.metadata.Latitude}, Longitude: ${prediction.metadata.Longitude}`
          )}
        </div>
        
        <div className="mt-4 bg-white p-3 rounded-lg border">
          <h6 className="text-sm font-bold text-gray-700 mb-2">Prediction Details</h6>
          <pre className="text-xs text-gray-800 overflow-auto max-h-40">
            {JSON.stringify(prediction.prediction, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          {!isStreaming ? (
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center justify-center"
              onClick={startPredictions}
            >
              <Video className="mr-2" /> Start Surveillance Predictions
            </button>
          ) : (
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-bold flex items-center justify-center"
              onClick={stopPredictions}
            >
              <Video className="mr-2" /> Stop Surveillance Predictions
            </button>
          )}
        </div>

        {predictions.map((prediction, index) => (
          prediction.original_image && prediction.predicted_image && (
            <PredictionCard key={index} prediction={prediction} />
          )
        ))}
      </div>
    </div>
  );
};

export default Predictions;
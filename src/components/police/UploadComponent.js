import React, { useState } from 'react';
import { UploadCloud, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import CustomCard from '../common/CustomCard';

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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Data</h2>
        
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

  export default UploadComponent;
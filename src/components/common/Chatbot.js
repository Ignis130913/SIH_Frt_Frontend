import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Shield, Bot, UserCircle } from 'lucide-react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const parseResponse = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanedText = part.replace(/\*\*/g, '');
        return (
          <span 
            key={index} 
            className="font-bold text-blue-600 bg-blue-50 px-1 rounded"
          >
            {cleanedText}
          </span>
        );
      }
      return part;
    });
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMessages = [...messages, { text: message, type: 'sent' }];
    setMessages(newMessages);
    setMessage('');
    try {
      const res = await axios.post('http://34.192.156.219:5000/chat', { message });
      setMessages(prevMessages => [...prevMessages, { 
        text: res.data.data, 
        type: 'received',
        parsed: true 
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { 
        text: 'System unavailable. Please try again later.', 
        type: 'received' 
      }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow container mx-auto max-w-2xl px-4 py-6 flex flex-col">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
          <div className="bg-blue-600 text-white p-4 flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <h2 className="text-xl font-bold">Surveillance Assistant</h2>
          </div>
          <div 
            className="flex-grow overflow-y-auto p-4 space-y-4"
            style={{ 
              backgroundColor: '#f9fafb',
              maxHeight: 'calc(100vh - 250px)'
            }}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex items-end space-x-3 ${
                  msg.type === 'sent' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {msg.type === 'sent' ? (
                  <UserCircle className="w-8 h-8 text-blue-500 flex-shrink-0" />
                ) : (
                  <Bot className="w-8 h-8 text-green-500 flex-shrink-0" />
                )}
                <div 
                  className={`p-3 rounded-xl max-w-[80%] ${
                    msg.type === 'sent' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.parsed ? parseResponse(msg.text) : msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-4 border-t border-gray-200 flex items-center space-x-2"
          >
            <input
              type="text"
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
            />
            <button 
              type="submit" 
              className={`p-2 rounded-full transition-colors ${
                message.trim() 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!message.trim()}
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { 
  BookOpen, 
  Users, 
  Shield, 
  MessageCircleQuestion, 
  Globe, 
  Info, 
  LogOut,
  X,
  Menu 
} from 'lucide-react';
import Intro from './Intro';
import Privacy from './Privacy';
import Community from './Community';
import Chatbot from '../common/Chatbot';
import AboutUs from '../common/AboutUs';
import Abnormal from '../common/Abnormal';
import Preloader from '../common/Preloader'

const MainPagePeople = ({ onLogout }) => {
  const [selectedComponent, setSelectedComponent] = useState('intro');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'intro':
        return <Intro />;
      case 'abnormal':
        return <Abnormal />;
      case 'privacy':
        return <Privacy />;
      case 'chatbot':
        return <Chatbot />;
      case 'community':
        return <Community />;
      case 'about':
        return <AboutUs />;
      default:
        return <Intro />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col 
          md={isSidebarOpen ? 3 : 1} 
          lg={isSidebarOpen ? 2 : 1} 
          className="bg-dark text-light min-vh-100 d-flex flex-column p-0 sidebar-transition"
          style={{ 
            backgroundColor: '#1e2125', 
            transition: 'width 0.3s ease-in-out' 
          }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center"
            style={{ 
              backgroundColor: '#2c3034', 
              borderColor: '#495057 !important' 
            }}
          >
            {isSidebarOpen && <h2 className="h4 mb-0 text-light">FRT Public Dashboard</h2>}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-outline-light btn-sm"
              style={{
                border: '1px solid rgba(255,255,255,0.5)',
                backgroundColor: 'transparent'
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
          <Nav className="flex-column p-3 flex-grow-1">
            <SidebarItem
              icon={<BookOpen size={20} />}
              text="Introduction"
              active={selectedComponent === 'intro'}
              onClick={() => setSelectedComponent('intro')}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<Users size={20} />}
              text="Crowd Surveillance"
              active={selectedComponent === 'abnormal'}
              onClick={() => setSelectedComponent('abnormal')}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<Shield size={20} />}
              text="Privacy"
              active={selectedComponent === 'privacy'}
              onClick={() => setSelectedComponent('privacy')}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<MessageCircleQuestion size={20} />}
              text="Law Chatbot"
              active={selectedComponent === 'chatbot'}
              onClick={() => setSelectedComponent('chatbot')}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<Globe size={20} />}
              text="Community"
              active={selectedComponent === 'community'}
              onClick={() => setSelectedComponent('community')}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<Info size={20} />}
              text="About Us"
              active={selectedComponent === 'about'}
              onClick={() => setSelectedComponent('about')}
              isOpen={isSidebarOpen}
            />
          </Nav>
          <Nav className="p-3">
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Logout"
              onClick={onLogout}
              isOpen={isSidebarOpen}
            />
          </Nav>
        </Col>
        <Col 
          md={isSidebarOpen ? 9 : 11} 
          lg={isSidebarOpen ? 10 : 11} 
          className="bg-light p-4 sidebar-transition"
          style={{ 
            backgroundColor: '#f4f6f9', 
            transition: 'width 0.3s ease-in-out' 
          }}
        >
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

const SidebarItem = ({ icon, text, active, onClick, isOpen }) => (
  <Nav.Link
    onClick={onClick}
    className={`d-flex align-items-center gap-2 mb-2 p-2 rounded sidebar-item`}
    style={{
      cursor: 'pointer',
      color: active ? '#ffffff' : '#adb5bd',
      backgroundColor: active ? '#0d6efd' : 'transparent',
      transition: 'all 0.3s ease',
    }}
  >
    {React.cloneElement(icon, { 
      className: active ? 'text-white' : 'text-secondary',
      style: { 
        transition: 'color 0.3s ease' 
      } 
    })}
    {isOpen && <span className="sidebar-text">{text}</span>}
  </Nav.Link>
);

export default MainPagePeople;
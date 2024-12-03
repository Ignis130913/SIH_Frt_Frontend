import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Upload, Award, FileVideo, Shield, Globe, Clock, TrendingUp } from 'lucide-react';
import './Community.css';

const Community = () => {
  const [activeTab, setActiveTab] = useState('activeEvents');

  const activeEvents = [
    {
      title: 'Community Video Surveillance Challenge',
      description: 'Help keep our community safe by sharing suspicious activity footage. Top contributors will be rewarded!',
      details: 'Upload video clips that might assist in solving potential criminal activities. Verified helpful submissions will receive government recognition and monetary rewards.',
      startDate: '15 December 2024',
      endDate: '15 February 2025',
      rewards: [
        { rank: 'First Prize', amount: '₹100,000' },
        { rank: 'Second Prize', amount: '₹50,000' },
        { rank: 'Third Prize', amount: '₹25,000' }
      ]
    },
    {
      title: 'Urban Traffic Safety Monitoring',
      description: 'Help reduce traffic violations and improve road safety in your city.',
      details: 'Capture and submit video evidence of traffic rule violations, dangerous driving, and potential road safety improvements.',
      startDate: '01 January 2025',
      endDate: '31 March 2025',
      rewards: [
        { rank: 'Top Contributor', amount: '₹75,000' },
        { rank: 'Most Consistent', amount: '₹40,000' }
      ]
    }
  ];

  const completedEvents = [
    {
      title: 'Neighborhood Watch Video Campaign',
      date: 'September 2023',
      description: 'A city-wide initiative to enhance community surveillance and crime prevention.',
      outcome: 'Successfully identified 3 potential suspects and reduced local crime rates by 15%',
      award: '₹50,000 Community Safety Grant',
      participants: 250,
      videosSubmitted: 523
    },
    {
      title: 'Traffic Safety Monitoring Project',
      date: 'June 2023',
      description: 'Comprehensive project to monitor and improve road safety standards.',
      outcome: 'Reduced traffic violations by 22% and improved pedestrian safety zones',
      award: 'Commendation from City Police',
      participants: 180,
      videosSubmitted: 412
    },
    {
      title: 'Public Space Security Initiative',
      date: 'March 2023',
      description: 'Community-driven effort to enhance security in public spaces.',
      outcome: 'Helped resolve 5 pending criminal cases and improved street lighting in 3 neighborhoods',
      award: 'Community Safety Medal',
      participants: 300,
      videosSubmitted: 678
    }
  ];

  const previousWinners = [
    {
      name: 'Rahul Sharma',
      city: 'Mumbai',
      contribution: 'Reported suspicious activity near railway station, leading to timely police intervention',
      award: '₹75,000',
      date: 'November 2024',
      impact: 'Prevented potential theft and ensured passenger safety'
    },
    {
      name: 'Priya Patel',
      city: 'Ahmedabad',
      contribution: 'Provided crucial video evidence in theft case, helping law enforcement track suspects',
      award: '₹50,000',
      date: 'September 2024',
      impact: 'Assisted in recovering stolen property and identifying criminal network'
    },
    {
      name: 'Amit Kumar',
      city: 'Delhi',
      contribution: 'Captured footage of hit-and-run suspect, enabling quick apprehension',
      award: '₹60,000',
      date: 'October 2024',
      impact: 'Helped bring a dangerous driver to justice and improve road safety'
    }
  ];

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-5 display-5 fw-bold text-primary">
          <Shield className="me-3 text-warning" size={50} /> 
          Community Safety Engagement Platform
        </h2>

        <div className="card shadow-lg border-0 rounded-4 mb-5">
          <div className="card-header bg-primary text-white py-3">
            <div className="nav nav-pills justify-content-center">
              {['activeEvents', 'completedEvents', 'winners'].map(tab => (
                <button 
                  key={tab}
                  className={`nav-link ${activeTab === tab ? 'active' : ''} mx-2`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'activeEvents' && <Upload className="me-2" />}
                  {tab === 'completedEvents' && <TrendingUp className="me-2" />}
                  {tab === 'winners' && <Award className="me-2" />}
                  {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="card-body">
            {activeTab === 'activeEvents' && (
              <div className="row">
                {activeEvents.map((event, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card h-100 border-primary">
                      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">{event.title}</h4>
                        <FileVideo size={30} />
                      </div>
                      <div className="card-body">
                        <p>{event.description}</p>
                        <div className="mb-3">
                          <p className="text-muted"><Clock className="me-2" /> Event Period: {event.startDate} - {event.endDate}</p>
                        </div>
                        <h5>Rewards</h5>
                        <div className="list-group">
                          {event.rewards.map((reward, i) => (
                            <div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                              {reward.rank}
                              <span className="badge bg-success rounded-pill">{reward.amount}</span>
                            </div>
                          ))}
                        </div>
                        <button className="btn btn-primary mt-3 w-100">
                          <FileVideo className="me-2" /> Submit Your Video
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'completedEvents' && (
              <div className="row">
                {completedEvents.map((event, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header bg-success text-white d-flex justify-content-between">
                        <h5 className="mb-0">{event.title}</h5>
                        <Globe size={24} />
                      </div>
                      <div className="card-body">
                        <p>{event.description}</p>
                        <div className="row text-center">
                          <div className="col-6">
                            <strong>Participants</strong>
                            <p className="text-muted">{event.participants}</p>
                          </div>
                          <div className="col-6">
                            <strong>Videos Submitted</strong>
                            <p className="text-muted">{event.videosSubmitted}</p>
                          </div>
                        </div>
                        <p><strong>Outcome:</strong> {event.outcome}</p>
                        <div className="badge bg-success">
                          <Award className="me-2" /> {event.award}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'winners' && (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Name</th>
                      <th>City</th>
                      <th>Contribution</th>
                      <th>Award</th>
                      <th>Date</th>
                      <th>Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousWinners.map((winner, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{winner.name}</td>
                        <td>{winner.city}</td>
                        <td>{winner.contribution}</td>
                        <td className="text-success">
                          <Award className="me-2" /> {winner.award}
                        </td>
                        <td>{winner.date}</td>
                        <td>{winner.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
import React from 'react';
import '../../App.css';
import {
  Shield, 
  Users, 
  Lightbulb, 
  Brain, 
  Cloud, 
  Layout, 
  Bitcoin,
  GraduationCap,
  Trophy,
  Target,
} from 'lucide-react';
import CustomCard from './CustomCard';
  
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

  export default AboutUs;
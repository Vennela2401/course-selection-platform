import React from 'react';
import Card from '../components/Card';
import { teamMembers } from '../data/teamData';

const Team = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-xl text-gray-600">
            Meet the talented individuals behind this project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="p-6 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 mb-3">ID: {member.id}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <a
                  href={`mailto:${member.email}`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  {member.email}
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-6 inline-block">
            <p className="text-gray-700">
              <span className="font-semibold">Total Team Members:</span> {teamMembers.length}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;

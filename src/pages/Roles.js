import React from 'react';
import Card from '../components/Card';
import { rolesAndResponsibilities } from '../data/rolesData';

const Roles = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Roles & Responsibilities</h1>
          <p className="text-xl text-gray-600">
            Clear division of responsibilities ensures project success
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rolesAndResponsibilities.map((item) => (
            <Card key={item.memberId} className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.memberName}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold">
                    {item.role}
                  </span>
                  <span className="text-sm text-gray-500">ID: {item.memberId}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  {item.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Team Collaboration</h2>
            <p className="text-gray-700 text-center max-w-3xl mx-auto mb-6">
              Effective collaboration is the cornerstone of our project success. Each team member
              has clearly defined roles and responsibilities, ensuring accountability and efficient
              workflow. Regular team meetings and code reviews help maintain quality and alignment
              with project goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {rolesAndResponsibilities.length}
                </div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">6+</div>
                <div className="text-gray-600">Key Roles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600">Commitment</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Roles;

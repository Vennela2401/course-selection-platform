import React from 'react';
import Card from '../components/Card';
import { facultyMembers } from '../data/facultyData';

const Faculty = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Faculty Advisors</h1>
          <p className="text-xl text-gray-600">
            Our dedicated faculty members guiding this project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty) => (
            <Card key={faculty.id} className="p-6 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                <p className="text-primary-600 font-semibold mb-1">{faculty.designation}</p>
                <p className="text-gray-600 mb-1">{faculty.department}</p>
                <p className="text-sm text-gray-500">ID: {faculty.id}</p>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Email:</span>{' '}
                    <a href={`mailto:${faculty.email}`} className="text-primary-600 hover:underline">
                      {faculty.email}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {faculty.phone}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {faculty.expertise.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Bio</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{faculty.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Faculty Support</h2>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              Our faculty advisors provide invaluable guidance, mentorship, and technical expertise
              throughout the project lifecycle. Their support ensures that we maintain high standards
              of quality and follow best practices in software development.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Faculty;

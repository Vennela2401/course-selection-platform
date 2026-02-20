import React from 'react';
import Card from '../components/Card';

const Prototype = () => {
  const prototypeLinks = [
    {
      title: 'Figma Prototype',
      description: 'Interactive UI/UX prototype with all screens and user flows',
      link: 'https://www.figma.com/prototype/example',
      icon: '🎨',
      status: 'Available'
    },
    {
      title: 'Live Demo',
      description: 'Deployed application running on production server',
      link: 'https://project-showcase-demo.netlify.app',
      icon: '🚀',
      status: 'Available'
    },
    {
      title: 'GitHub Repository',
      description: 'Source code repository with complete project files',
      link: 'https://github.com/yourusername/project-showcase',
      icon: '💻',
      status: 'Available'
    },
    {
      title: 'Documentation',
      description: 'Comprehensive project documentation and API references',
      link: 'https://docs.project-showcase.com',
      icon: '📚',
      status: 'Available'
    }
  ];

  const deploymentInfo = [
    {
      platform: 'Frontend Deployment',
      service: 'Netlify / Vercel',
      url: 'https://project-showcase.netlify.app',
      status: 'Active'
    },
    {
      platform: 'Backend API',
      service: 'Heroku / Railway',
      url: 'https://api.project-showcase.com',
      status: 'Active'
    },
    {
      platform: 'Database',
      service: 'MongoDB Atlas',
      url: 'Cloud Database',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prototype & Deployment</h1>
          <p className="text-xl text-gray-600">
            Access our prototypes, demos, and deployment links
          </p>
        </div>

        {/* Prototype Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prototype Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prototypeLinks.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                      >
                        Visit Link
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Deployment Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Deployment Information</h2>
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">URL</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deploymentInfo.map((info, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{info.platform}</td>
                      <td className="py-3 px-4 text-gray-600">{info.service}</td>
                      <td className="py-3 px-4">
                        {info.url.startsWith('http') ? (
                          <a
                            href={info.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline"
                          >
                            {info.url}
                          </a>
                        ) : (
                          <span className="text-gray-600">{info.url}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {info.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Access Instructions</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-700">
            <div className="flex items-start">
              <span className="text-primary-600 mr-3 font-bold">1.</span>
              <p>
                <strong>Figma Prototype:</strong> Click the link above to view our interactive prototype.
                You can navigate through all screens and test user interactions.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-primary-600 mr-3 font-bold">2.</span>
              <p>
                <strong>Live Demo:</strong> The deployed application is available 24/7. All features
                are fully functional and ready for testing.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-primary-600 mr-3 font-bold">3.</span>
              <p>
                <strong>GitHub Repository:</strong> Source code is publicly available. Feel free to
                explore, fork, or contribute to the project.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-primary-600 mr-3 font-bold">4.</span>
              <p>
                <strong>Documentation:</strong> Comprehensive documentation includes setup instructions,
                API references, and contribution guidelines.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Prototype;

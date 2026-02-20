import React, { useState } from 'react';
import Card from '../components/Card';
import { galleryImages } from '../data/galleryData';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Gallery</h1>
          <p className="text-xl text-gray-600">
            Screenshots and visuals from our project
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className="overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => openModal(image)}
            >
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                  {image.category}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Image Counter */}
        <div className="mt-8 text-center">
          <Card className="p-4 inline-block">
            <p className="text-gray-700">
              Showing <span className="font-semibold">{filteredImages.length}</span> of{' '}
              <span className="font-semibold">{galleryImages.length}</span> images
            </p>
          </Card>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600 mb-3">{selectedImage.description}</p>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

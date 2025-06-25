import React, { useState } from 'react';
import { Phone, MapPin, Gavel, UserRound, Heart, Search } from 'lucide-react';

type Resource = {
  id: string;
  name: string;
  category: 'helpline' | 'shelter' | 'legal' | 'counseling' | 'medical';
  description: string;
  contact: string;
  hours: string;
  address?: string;
  website?: string;
};

const resources: Resource[] = [
  {
    id: '1',
    name: 'National Domestic Violence Hotline',
    category: 'helpline',
    description: 'Available 24/7 to provide support, resources, and safety planning.',
    contact: '1-800-799-7233',
    hours: '24/7',
    website: 'https://www.thehotline.org',
  },
  {
    id: '2',
    name: 'Women Helpline',
    category: 'helpline',
    description: 'Immediate assistance for women facing violence or threats.',
    contact: '1091 or 181 (Toll Free)',
    hours: '24/7',
  },
  {
    id: '3',
    name: 'Safe Haven Shelter',
    category: 'shelter',
    description: 'Emergency shelter providing safe accommodation, food, and support services.',
    contact: '+91 9999464828',
    hours: '24/7',
    address: 'Nirmal Chhaya Complex, Jail Road, Hari Nagar, Delhi-110064',
  },
  {
    id: '4',
    name: 'National Legal Service Authority (NALSA) | India',
    category: 'legal',
    description: 'Free legal advice and representation for domestic violence cases, restraining orders, and family law.',
    contact: '15100 (Toll Free)',
    hours: '24/7',
    // website: 'https://www.womenslaw.org',
  },
  {
    id: '5',
    name: 'Mental Health Rehabilitation',
    category: 'counseling',
    description: 'Specialized counseling services for survivors of domestic violence and trauma.',
    contact: '1800-599-0019 (Toll Free)',
    hours: '24/7',
    // website: 'https://www.thelivelovelaughfoundation.org/find-help/helplines',
  },
  {
    id: '6',
    name: 'Emergency Medical Response',
    category: 'medical',
    description: 'Immediate medical attention for injuries related to domestic violence.',
    contact: '108',
    hours: '24/7',
  },
];

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'helpline', name: 'Helplines', icon: <Phone className="w-5 h-5" /> },
    { id: 'shelter', name: 'Shelters', icon: <MapPin className="w-5 h-5" /> },
    { id: 'legal', name: 'Legal Aid', icon: <Gavel className="w-5 h-5" /> },
    { id: 'counseling', name: 'Counseling', icon: <UserRound className="w-5 h-5" /> },
    { id: 'medical', name: 'Medical', icon: <Heart className="w-5 h-5" /> },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
          Support Resources
        </h1>
        <p className="text-gray-600 mt-2">
          Find help and support services available to you.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
              placeholder="Search for resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedCategory === null
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-lg font-semibold text-red-800 mb-2">
          Emergency Resources
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Phone className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">Emergency Services: 100 (Toll Free)</p>
              <p className="text-sm text-red-600">For immediate police, medical, or fire assistance</p>
            </div>
          </li>
          <li className="flex items-start">
            <Phone className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">National Domestic Violence Hotline: 1-800-799-7233 (Toll Free)</p>
              <p className="text-sm text-red-600">24/7 support, crisis intervention, and referrals</p>
            </div>
          </li>
          <li className="flex items-start">
            <Phone className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">Women Helpline: 1091 or 181 (Toll Free)</p>
              <p className="text-sm text-red-600">Immediate assistance for women in distress</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Resource Listings */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              No resources found matching your criteria. Try adjusting your search.
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
        <p>
          <strong>Note:</strong> This list is not exhaustive. If you need assistance finding resources in your area, 
          please contact the National Domestic Violence Hotline at 1-800-799-7233.
        </p>
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'helpline': return <Phone className="w-5 h-5 text-blue-500" />;
      case 'shelter': return <MapPin className="w-5 h-5 text-green-500" />;
      case 'legal': return <Gavel className="w-5 h-5 text-purple-500" />;
      case 'counseling': return <UserRound className="w-5 h-5 text-yellow-500" />;
      case 'medical': return <Heart className="w-5 h-5 text-red-500" />;
      default: return <MapPin className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'helpline': return 'bg-blue-50 text-blue-800 border-blue-100';
      case 'shelter': return 'bg-green-50 text-green-800 border-green-100';
      case 'legal': return 'bg-purple-50 text-purple-800 border-purple-100';
      case 'counseling': return 'bg-yellow-50 text-yellow-800 border-yellow-100';
      case 'medical': return 'bg-red-50 text-red-800 border-red-100';
      default: return 'bg-gray-50 text-gray-800 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
        <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
          {getCategoryIcon(resource.category)}
          <span className="ml-1">
            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
          </span>
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{resource.description}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <Phone className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
          <p>
            <span className="font-medium">Contact: </span>
            <a href={`tel:${resource.contact.replace(/[^0-9]/g, '')}`} className="text-purple-600 hover:underline">
              {resource.contact}
            </a>
          </p>
        </div>
        
        <div className="flex items-start">
          <Clock className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
          <p><span className="font-medium">Hours: </span>{resource.hours}</p>
        </div>
        
        {resource.address && (
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
            <p><span className="font-medium">Location: </span>{resource.address}</p>
          </div>
        )}
        
        {resource.website && (
          <div className="flex items-start">
            <Globe className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
            <p>
              <span className="font-medium">Website: </span>
              <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                Visit website
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Add missing icons
const Clock: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Globe: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export default ResourcesPage;
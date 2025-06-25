import React from 'react';
import { Heart, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              EiraSafe - Your safe space for healing and support
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-8">
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 text-purple-600 mr-2" />
                <a 
                  href="tel:112" 
                  className="text-purple-700 hover:text-purple-900 text-sm font-medium"
                >
                  Emergency Helpline: 112
                </a>
                
                <label className="h-4 w-4 text-purple-600 mr-2" />
                <a 
                  href="mailto:eirasafe@gmail.com" 
                  className="text-purple-700 hover:text-purple-900 text-sm font-medium"
                >
                  Mail Id: eirasafe@gmail.com
                </a>
                <label className="h-4 w-4 text-purple-600 mr-2" />
                <a 
                  className="text-purple-700 hover:text-purple-900 text-sm font-medium"
                >
                  Built with bolt.new
                </a>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>for safety and healing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
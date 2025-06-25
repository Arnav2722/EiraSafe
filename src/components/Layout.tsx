import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PanicButton from './PanicButton';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        <Outlet />
        <PanicButton />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
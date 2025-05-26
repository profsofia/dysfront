import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/layouts/components/Header';
import Footer from '@/layouts/components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
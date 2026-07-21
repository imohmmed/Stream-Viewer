import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full">
      <Navbar />
      <main className="flex-1 w-full pt-20 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};


import React from 'react';
import Header from '../components/Header';
import ScanningFrame from '../components/ScanningFrame';
import ProductCard from '../components/ProductCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Camera feed simulation background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50"></div>
        {/* Subtle grid pattern to simulate camera feed */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        {/* Main scanning area */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <ScanningFrame />
        </div>
        
        {/* Bottom card panel */}
        <div className="mt-auto">
          <ProductCard />
        </div>
        
        {/* Scan button */}
        <div className="pb-8 px-4">
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            Tap to Scan
          </button>
        </div>
      </div>
      
      {/* Ambient light effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default Index;

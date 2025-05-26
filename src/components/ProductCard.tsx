
import React from 'react';

const ProductCard = () => {
  return (
    <div className="fade-in-up mx-4 mb-6">
      <div className="glass-effect rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-sm text-white/70 mb-1">Barcode Number</div>
            <div className="font-mono text-lg text-white font-semibold">8901030789123</div>
          </div>
          <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            In Stock
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <h3 className="text-xl font-bold text-white mb-2">Glucometer</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Digital blood glucose monitoring device with accurate readings and easy-to-use interface. 
            Includes test strips and lancets.
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="text-white/70 text-sm">
            Last scanned: 2 min ago
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

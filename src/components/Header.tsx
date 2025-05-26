
import React from 'react';
import { Settings, History, Barcode } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 pt-12">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 p-2 rounded-xl">
          <Barcode className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">Scanner</h1>
          <p className="text-white/70 text-sm">Point camera at barcode</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="glass-effect p-3 rounded-xl">
          <History className="w-5 h-5 text-white" />
        </button>
        <button className="glass-effect p-3 rounded-xl">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Header;

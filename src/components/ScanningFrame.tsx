
import React from 'react';

const ScanningFrame = () => {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Main scanning frame */}
      <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
        {/* Animated corners */}
        <div className="corner-pulse absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
        <div className="corner-pulse absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
        <div className="corner-pulse absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
        <div className="corner-pulse absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
        
        {/* Scanning line */}
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-lg">
          <div className="scan-line absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg shadow-blue-400/50"></div>
        </div>
        
        {/* Sample barcode in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex space-x-1">
              {/* Barcode stripes */}
              {[2, 1, 3, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2].map((width, index) => (
                <div
                  key={index}
                  className="bg-black"
                  style={{
                    width: `${width * 2}px`,
                    height: '60px'
                  }}
                ></div>
              ))}
            </div>
            <div className="text-center text-xs mt-2 font-mono text-gray-700">
              8901030789123
            </div>
          </div>
        </div>
      </div>
      
      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 border-2 border-blue-400 rounded-full bg-blue-400/20"></div>
      </div>
    </div>
  );
};

export default ScanningFrame;


import React from 'react';

interface ScanningFrameProps {
  isScanning?: boolean;
}

const ScanningFrame: React.FC<ScanningFrameProps> = ({ isScanning = false }) => {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Main scanning frame */}
      <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
        {/* Animated corners */}
        <div className={`corner-pulse absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-lg ${isScanning ? 'border-green-400' : 'border-blue-400'}`}></div>
        <div className={`corner-pulse absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-lg ${isScanning ? 'border-green-400' : 'border-blue-400'}`}></div>
        <div className={`corner-pulse absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-lg ${isScanning ? 'border-green-400' : 'border-blue-400'}`}></div>
        <div className={`corner-pulse absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-lg ${isScanning ? 'border-green-400' : 'border-blue-400'}`}></div>
        
        {/* Scanning line - only show when actively scanning */}
        {isScanning && (
          <div className="absolute inset-x-0 top-0 h-full overflow-hidden rounded-lg">
            <div className="scan-line absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-lg shadow-green-400/50"></div>
          </div>
        )}
        
        {/* Sample barcode in center - only show when not scanning */}
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex space-x-1">
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
        )}
      </div>
      
      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`w-6 h-6 border-2 rounded-full ${isScanning ? 'border-green-400 bg-green-400/20' : 'border-blue-400 bg-blue-400/20'}`}></div>
      </div>
    </div>
  );
};

export default ScanningFrame;

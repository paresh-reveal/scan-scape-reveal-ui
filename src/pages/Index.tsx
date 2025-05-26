
import React, { useState } from 'react';
import Header from '../components/Header';
import ScanningFrame from '../components/ScanningFrame';
import ProductCard from '../components/ProductCard';
import CameraScanner from '../components/CameraScanner';

interface ScannedProduct {
  barcode: string;
  name: string;
  description: string;
  status: string;
  lastScanned: string;
}

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null);

  const handleScanResult = (barcode: string) => {
    console.log('Scanned barcode:', barcode);
    
    // Mock product data - in a real app, this would fetch from an API
    const mockProduct: ScannedProduct = {
      barcode,
      name: getProductName(barcode),
      description: getProductDescription(barcode),
      status: 'In Stock',
      lastScanned: 'Just now'
    };
    
    setScannedProduct(mockProduct);
    setIsScanning(false);
  };

  const getProductName = (barcode: string): string => {
    // Mock product mapping - replace with real API call
    const products: Record<string, string> = {
      '8901030789123': 'Glucometer',
      '1234567890123': 'Digital Thermometer',
      '9876543210987': 'Blood Pressure Monitor'
    };
    return products[barcode] || 'Unknown Product';
  };

  const getProductDescription = (barcode: string): string => {
    const descriptions: Record<string, string> = {
      '8901030789123': 'Digital blood glucose monitoring device with accurate readings and easy-to-use interface. Includes test strips and lancets.',
      '1234567890123': 'Fast and accurate digital thermometer for body temperature measurement.',
      '9876543210987': 'Automatic digital blood pressure monitor with large display.'
    };
    return descriptions[barcode] || 'Product information not available.';
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScannedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Camera feed or mock background */}
      <div className="absolute inset-0">
        {isScanning ? (
          <CameraScanner onScanResult={handleScanResult} isScanning={isScanning} />
        ) : (
          <>
            <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </>
        )}
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        {/* Main scanning area */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <ScanningFrame isScanning={isScanning} />
        </div>
        
        {/* Bottom card panel - show only if we have scanned data */}
        {scannedProduct && (
          <div className="mt-auto">
            <ProductCard product={scannedProduct} />
          </div>
        )}
        
        {/* Scan button */}
        <div className="pb-8 px-4">
          <button 
            onClick={handleStartScan}
            disabled={isScanning}
            className={`w-full py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 transform ${
              isScanning 
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl hover:scale-[1.02]'
            }`}
          >
            {isScanning ? 'Scanning...' : 'Tap to Scan'}
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

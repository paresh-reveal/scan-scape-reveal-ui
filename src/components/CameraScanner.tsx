
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface CameraScannerProps {
  onScanResult: (result: string) => void;
  isScanning: boolean;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onScanResult, isScanning }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (isScanning) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isScanning]);

  const startScanning = async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setError('');

        // Initialize barcode reader
        codeReader.current = new BrowserMultiFormatReader();
        
        // Start decoding
        codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
          if (result) {
            onScanResult(result.getText());
          }
        });
      }
    } catch (err) {
      setHasPermission(false);
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (codeReader.current) {
      codeReader.current.reset();
    }
  };

  if (hasPermission === false) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-center p-6">
          <div className="text-white text-lg mb-4">Camera Access Required</div>
          <div className="text-white/70 text-sm">
            Please allow camera access to scan barcodes
          </div>
          <button 
            onClick={startScanning}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-center p-6">
          <div className="text-white text-lg mb-2">Error</div>
          <div className="text-white/70 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export default CameraScanner;


import React from 'react';
import { ArrowLeft, Clock, Package, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScanHistoryItem {
  id: string;
  barcode: string;
  productName: string;
  timestamp: Date;
  location?: string;
  status: 'success' | 'not_found';
}

const ScanHistory = () => {
  const navigate = useNavigate();
  
  // Mock scan history data - in a real app, this would come from a store/database
  const scanHistory: ScanHistoryItem[] = [
    {
      id: '1',
      barcode: '8901030789123',
      productName: 'Digital Glucometer Pro',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      location: 'Warehouse A - Shelf B2',
      status: 'success'
    },
    {
      id: '2',
      barcode: '1234567890123',
      productName: 'Digital Thermometer Advanced',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      location: 'Warehouse B - Shelf A1',
      status: 'success'
    },
    {
      id: '3',
      barcode: '9999999999999',
      productName: 'Unknown Product',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'not_found'
    }
  ];

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="glass-effect p-2 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="bg-blue-500 p-2 rounded-xl">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Scan History</h1>
            <p className="text-white/70 text-sm">View all scanned products</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {scanHistory.length === 0 ? (
          <Card className="glass-effect border-white/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-12 h-12 text-white/50 mb-4" />
              <p className="text-white/70 text-center">No scan history yet</p>
              <p className="text-white/50 text-sm text-center mt-2">
                Start scanning barcodes to see your history here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {scanHistory.map((item) => (
              <Card key={item.id} className="glass-effect border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">
                        {item.productName}
                      </CardTitle>
                      <p className="text-white/70 text-sm font-mono">
                        {item.barcode}
                      </p>
                    </div>
                    <Badge 
                      variant={item.status === 'success' ? 'default' : 'destructive'}
                      className={item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}
                    >
                      {item.status === 'success' ? 'Found' : 'Not Found'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-white/70">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(item.timestamp)}</span>
                      </div>
                      {item.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Ambient light effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default ScanHistory;

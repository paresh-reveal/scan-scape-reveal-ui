
import React from 'react';
import { Package, Calendar, MapPin, Building2, Hash, BarChart3, X, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface ProductInfo {
  product_name: string;
  gtin: string;
  batch_lot_number: string;
  expiry_date: Date;
  serial_number: string;
  barcode: string;
  location: string;
  quantity: number;
  manufacturer: string;
}

interface ProductInfoCardProps {
  product: ProductInfo;
  onRescan: () => void;
  onClear: () => void;
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({ product, onRescan, onClear }) => {
  const isExpired = product.expiry_date <= new Date();
  const isExpiringSoon = product.expiry_date <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const getExpiryStatus = () => {
    if (isExpired) return { color: 'bg-red-500', text: 'Expired' };
    if (isExpiringSoon) return { color: 'bg-yellow-500', text: 'Expiring Soon' };
    return { color: 'bg-green-500', text: 'Valid' };
  };

  const expiryStatus = getExpiryStatus();

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            Product Information
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onRescan} className="flex items-center gap-1">
              <RotateCcw className="w-4 h-4" />
              Rescan
            </Button>
            <Button variant="ghost" size="sm" onClick={onClear}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Product Identification */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">Product Identification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Package className="w-4 h-4" />
                Product Name
              </div>
              <p className="font-semibold text-gray-900">{product.product_name}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Building2 className="w-4 h-4" />
                Manufacturer
              </div>
              <p className="font-semibold text-gray-900">{product.manufacturer}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Hash className="w-4 h-4" />
                GTIN
              </div>
              <p className="font-mono text-sm text-gray-900">{product.gtin}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <BarChart3 className="w-4 h-4" />
                Barcode
              </div>
              <p className="font-mono text-sm text-gray-900">{product.barcode}</p>
            </div>
          </div>
        </div>

        {/* Batch & Serial Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">Batch & Serial Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Hash className="w-4 h-4" />
                Batch/Lot Number
              </div>
              <p className="font-mono text-sm text-gray-900">{product.batch_lot_number}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Hash className="w-4 h-4" />
                Serial Number
              </div>
              <p className="font-mono text-sm text-gray-900">{product.serial_number}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                Expiry Date
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">
                  {format(product.expiry_date, 'MMM dd, yyyy')}
                </p>
                <Badge variant="secondary" className={`${expiryStatus.color} text-white`}>
                  {expiryStatus.text}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">Logistics Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                Location
              </div>
              <p className="font-semibold text-gray-900">{product.location}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <BarChart3 className="w-4 h-4" />
                Quantity
              </div>
              <p className="font-semibold text-gray-900">{product.quantity} units</p>
            </div>
          </div>
        </div>

        {/* Status Alerts */}
        {(isExpired || isExpiringSoon) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">
                  {isExpired ? 'Product Expired' : 'Product Expiring Soon'}
                </p>
                <p className="text-sm text-yellow-700">
                  {isExpired 
                    ? 'This product has passed its expiry date and should not be used.'
                    : 'This product will expire within 30 days. Please use soon.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductInfoCard;

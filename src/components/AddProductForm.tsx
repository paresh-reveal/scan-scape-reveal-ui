
import React, { useState } from 'react';
import { Calendar, CalendarDays, Package, MapPin, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ProductFormData {
  product_name: string;
  gtin: string;
  batch_lot_number: string;
  expiry_date: Date | undefined;
  serial_number: string;
  barcode: string;
  location: string;
  quantity: number;
  manufacturer: string;
}

interface FormErrors {
  [key: string]: string;
}

interface AddProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    product_name: '',
    gtin: '',
    batch_lot_number: '',
    expiry_date: undefined,
    serial_number: '',
    barcode: '',
    location: '',
    quantity: 1,
    manufacturer: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'product_name':
        if (!value || value.trim().length === 0) return 'Product name is required';
        if (value.length > 255) return 'Product name must be less than 255 characters';
        break;
      case 'gtin':
        if (!value || value.trim().length === 0) return 'GTIN is required';
        if (value.length > 50) return 'GTIN must be less than 50 characters';
        break;
      case 'batch_lot_number':
        if (!value || value.trim().length === 0) return 'Batch/Lot number is required';
        if (value.length > 50) return 'Batch/Lot number must be less than 50 characters';
        break;
      case 'expiry_date':
        if (!value) return 'Expiry date is required';
        if (value <= new Date()) return 'Expiry date must be in the future';
        break;
      case 'serial_number':
        if (!value || value.trim().length === 0) return 'Serial number is required';
        if (value.length > 50) return 'Serial number must be less than 50 characters';
        break;
      case 'barcode':
        if (!value || value.trim().length === 0) return 'Barcode is required';
        if (value.length > 255) return 'Barcode must be less than 255 characters';
        break;
      case 'location':
        if (!value || value.trim().length === 0) return 'Location is required';
        if (value.length > 255) return 'Location must be less than 255 characters';
        break;
      case 'quantity':
        if (!value || value < 1) return 'Quantity must be at least 1';
        break;
      case 'manufacturer':
        if (!value || value.trim().length === 0) return 'Manufacturer is required';
        if (value.length > 255) return 'Manufacturer must be less than 255 characters';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof ProductFormData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-500" />
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Identification Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Product Identification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product_name">Product Name *</Label>
                <Input
                  id="product_name"
                  placeholder="Enter product name"
                  value={formData.product_name}
                  onChange={(e) => handleInputChange('product_name', e.target.value)}
                  onBlur={(e) => handleBlur('product_name', e.target.value)}
                  className={errors.product_name ? 'border-red-500' : ''}
                />
                {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gtin">GTIN *</Label>
                <Input
                  id="gtin"
                  placeholder="Global Trade Item Number"
                  value={formData.gtin}
                  onChange={(e) => handleInputChange('gtin', e.target.value)}
                  onBlur={(e) => handleBlur('gtin', e.target.value)}
                  className={errors.gtin ? 'border-red-500' : ''}
                />
                {errors.gtin && <p className="text-red-500 text-sm">{errors.gtin}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode *</Label>
                <Input
                  id="barcode"
                  placeholder="Barcode value"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  onBlur={(e) => handleBlur('barcode', e.target.value)}
                  className={errors.barcode ? 'border-red-500' : ''}
                />
                {errors.barcode && <p className="text-red-500 text-sm">{errors.barcode}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer *</Label>
                <Input
                  id="manufacturer"
                  placeholder="Manufacturer name"
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                  onBlur={(e) => handleBlur('manufacturer', e.target.value)}
                  className={errors.manufacturer ? 'border-red-500' : ''}
                />
                {errors.manufacturer && <p className="text-red-500 text-sm">{errors.manufacturer}</p>}
              </div>
            </div>
          </div>

          {/* Batch & Serial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Batch & Serial Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batch_lot_number">Batch/Lot Number *</Label>
                <Input
                  id="batch_lot_number"
                  placeholder="Batch or lot number"
                  value={formData.batch_lot_number}
                  onChange={(e) => handleInputChange('batch_lot_number', e.target.value)}
                  onBlur={(e) => handleBlur('batch_lot_number', e.target.value)}
                  className={errors.batch_lot_number ? 'border-red-500' : ''}
                />
                {errors.batch_lot_number && <p className="text-red-500 text-sm">{errors.batch_lot_number}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serial_number">Serial Number *</Label>
                <Input
                  id="serial_number"
                  placeholder="Serial number"
                  value={formData.serial_number}
                  onChange={(e) => handleInputChange('serial_number', e.target.value)}
                  onBlur={(e) => handleBlur('serial_number', e.target.value)}
                  className={errors.serial_number ? 'border-red-500' : ''}
                />
                {errors.serial_number && <p className="text-red-500 text-sm">{errors.serial_number}</p>}
              </div>

              <div className="space-y-2">
                <Label>Expiry Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.expiry_date && "text-muted-foreground",
                        errors.expiry_date && "border-red-500"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {formData.expiry_date ? format(formData.expiry_date, "PPP") : "Pick expiry date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.expiry_date}
                      onSelect={(date) => handleInputChange('expiry_date', date)}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.expiry_date && <p className="text-red-500 text-sm">{errors.expiry_date}</p>}
              </div>
            </div>
          </div>

          {/* Logistics Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Logistics Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Storage location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  onBlur={(e) => handleBlur('location', e.target.value)}
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  onBlur={(e) => handleBlur('quantity', parseInt(e.target.value) || 0)}
                  className={errors.quantity ? 'border-red-500' : ''}
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" className="flex-1">
              Add Product
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;

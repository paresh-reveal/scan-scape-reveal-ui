
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from '../components/AddProductForm';
import { toast } from '@/components/ui/sonner';

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

const AddProduct = () => {
  const navigate = useNavigate();

  const handleAddProductSubmit = (productData: ProductFormData) => {
    console.log('New product added:', productData);
    // Here you would typically save to a database
    
    // Show success message
    toast.success('Product added successfully!', {
      description: `${productData.product_name} has been added to the inventory.`,
    });
    
    // Navigate back to home
    navigate('/');
  };

  const handleAddProductCancel = () => {
    navigate('/');
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
          <div>
            <h1 className="text-white text-xl font-bold">Add Product</h1>
            <p className="text-white/70 text-sm">Create new product entry</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        <AddProductForm 
          onSubmit={handleAddProductSubmit}
          onCancel={handleAddProductCancel}
        />
      </div>

      {/* Ambient light effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default AddProduct;

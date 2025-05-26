
import React from 'react';
import { Settings, History, Barcode, Plus, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddProduct?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="glass-effect p-3 rounded-xl bg-transparent hover:bg-white/10">
              <Settings className="w-5 h-5 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm border border-white/20" align="end">
            <DropdownMenuItem 
              onClick={onAddProduct}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <History className="w-4 h-4" />
              Scan History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
              <LogOut className="w-4 h-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;

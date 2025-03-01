import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import InventoryItem from '@/components/ui/InventoryItem';
import ScanModal from '@/components/ui/ScanModal';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, ScanLine, ChefHat, Calendar } from 'lucide-react';
import { toast } from "sonner";
import { Link } from 'react-router-dom';

const Inventory = () => {
  const { items, scanItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const categorizedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  const handleScanComplete = async (barcode: string) => {
    setIsScanModalOpen(false);
    
    toast.promise(scanItem(barcode), {
      loading: 'Searching for product...',
      success: (item) => {
        if (item) {
          return `Added ${item.name} to your inventory!`;
        }
        return 'Item not found. Please add manually.';
      },
      error: 'Failed to add item. Please try again.',
    });
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Inventory</h1>
          <p className="text-muted-foreground mt-2">
            Manage your kitchen inventory and keep track of your ingredients
          </p>
        </div>
        
        <div className="flex gap-2">
          <BlurredBackground className="flex items-center px-3 py-2 w-full md:w-auto">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search items..."
              className="bg-transparent border-none focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </BlurredBackground>
          
          <button className="p-2 rounded-lg glass-card">
            <Filter className="h-5 w-5" />
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-primary text-white flex items-center"
            onClick={() => setIsScanModalOpen(true)}
          >
            <ScanLine className="h-5 w-5 mr-2" />
            <span>Scan</span>
          </motion.button>
          
          <Link to="/future-inventory">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-secondary text-white flex items-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span>Plan Meals</span>
            </motion.button>
          </Link>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <BlurredBackground className="p-8 text-center">
          <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your inventory is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start by scanning items from your kitchen to build your inventory
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-primary text-white flex items-center mx-auto"
            onClick={() => setIsScanModalOpen(true)}
          >
            <ScanLine className="h-5 w-5 mr-2" />
            <span>Scan Items</span>
          </motion.button>
        </BlurredBackground>
      ) : (
        <div className="space-y-8">
          {Object.entries(categorizedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryItems.map((item) => (
                  <InventoryItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </motion.button>
      
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </div>
  );
};

export default Inventory;

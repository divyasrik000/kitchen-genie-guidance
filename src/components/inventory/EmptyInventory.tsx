
import React from 'react';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Plus, ScanLine, ChefHat } from 'lucide-react';

interface EmptyInventoryProps {
  onScanClick: () => void;
  onAddClick: () => void;
}

const EmptyInventory: React.FC<EmptyInventoryProps> = ({ onScanClick, onAddClick }) => {
  return (
    <BlurredBackground className="p-8 text-center">
      <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your inventory is empty</h2>
      <p className="text-muted-foreground mb-6">
        Start by scanning items from your kitchen to build your inventory
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-primary text-white flex items-center justify-center"
          onClick={onScanClick}
        >
          <ScanLine className="h-5 w-5 mr-2" />
          <span>Scan Items</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-secondary text-white flex items-center justify-center"
          onClick={onAddClick}
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Item Manually</span>
        </motion.button>
      </div>
    </BlurredBackground>
  );
};

export default EmptyInventory;

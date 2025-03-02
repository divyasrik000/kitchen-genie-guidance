
import React from 'react';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Search, Filter, ScanLine, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InventorySearchControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onScanClick: () => void;
}

const InventorySearchControls: React.FC<InventorySearchControlsProps> = ({
  searchTerm,
  setSearchTerm,
  onScanClick
}) => {
  const navigate = useNavigate();
  
  return (
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
        onClick={onScanClick}
      >
        <ScanLine className="h-5 w-5 mr-2" />
        <span>Scan</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-lg bg-secondary text-white flex items-center"
        onClick={() => navigate('/future-inventory')}
      >
        <Calendar className="h-5 w-5 mr-2" />
        <span>Plan Meals</span>
      </motion.button>
    </div>
  );
};

export default InventorySearchControls;

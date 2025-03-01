
import React from 'react';
import { motion } from 'framer-motion';
import StatusChip from './StatusChip';
import { MoreVertical, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export interface InventoryItemType {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: Date;
  addedDate: Date;
  status: 'low' | 'medium' | 'high' | 'empty' | 'expired' | 'fresh';
  barcode?: string;
  image?: string;
}

interface InventoryItemProps {
  item: InventoryItemType;
  onClick?: (item: InventoryItemType) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onClick }) => {
  const daysUntilExpiry = Math.ceil(
    (item.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const expiryFormatted = daysUntilExpiry <= 0
    ? 'Expired'
    : daysUntilExpiry === 1
    ? 'Expires tomorrow'
    : `Expires in ${daysUntilExpiry} days`;
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass-card p-4 hover-scale"
      onClick={() => onClick?.(item)}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <StatusChip status={item.status} />
            <span className="text-xs text-muted-foreground">{item.category}</span>
          </div>
          
          <h3 className="text-lg font-medium mt-2">{item.name}</h3>
          
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-semibold">{item.quantity}</span>
            <span className="ml-1 text-sm text-muted-foreground">{item.unit}</span>
          </div>
          
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{expiryFormatted}</span>
          </div>
        </div>
        
        {item.image ? (
          <div className="h-20 w-20 rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-20 w-20 rounded-lg bg-accent flex items-center justify-center text-muted-foreground">
            <span className="text-2xl font-semibold uppercase">
              {item.name.slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Added {format(item.addedDate, 'MMM d, yyyy')}
        </div>
        <button className="p-1 rounded-full hover:bg-muted transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default InventoryItem;

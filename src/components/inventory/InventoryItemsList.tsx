
import React from 'react';
import InventoryItem, { InventoryItemType } from '@/components/ui/InventoryItem';
import { Edit, Trash2 } from 'lucide-react';

interface InventoryItemsListProps {
  categorizedItems: Record<string, InventoryItemType[]>;
  onItemClick: (item: InventoryItemType) => void;
  onDeleteItem: (id: string) => void;
}

const InventoryItemsList: React.FC<InventoryItemsListProps> = ({
  categorizedItems,
  onItemClick,
  onDeleteItem
}) => {
  return (
    <div className="space-y-8">
      {Object.entries(categorizedItems).map(([category, categoryItems]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryItems.map((item) => (
              <div key={item.id} className="relative group">
                <InventoryItem 
                  item={item} 
                  onClick={() => onItemClick(item)}
                />
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemClick(item);
                    }}
                    className="p-1.5 rounded-full bg-accent/80 hover:bg-accent text-primary"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(item.id);
                    }}
                    className="p-1.5 rounded-full bg-destructive/20 hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryItemsList;


import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { InventoryItemType } from '@/components/ui/InventoryItem';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: InventoryItemType | null;
  setSelectedItem: (item: InventoryItemType | null) => void;
  handleEditItem: () => void;
  handleDeleteItem: (id: string) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
  setSelectedItem,
  handleEditItem,
  handleDeleteItem
}) => {
  if (!isOpen || !selectedItem) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              value={selectedItem.name}
              onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input 
                type="number" 
                value={selectedItem.quantity}
                onChange={(e) => setSelectedItem({...selectedItem, quantity: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Unit</label>
              <select 
                value={selectedItem.unit}
                onChange={(e) => setSelectedItem({...selectedItem, unit: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="g">Grams</option>
                <option value="lbs">Pounds</option>
                <option value="oz">Ounces</option>
                <option value="l">Liters</option>
                <option value="ml">Milliliters</option>
                <option value="cup">Cups</option>
                <option value="tbsp">Tablespoons</option>
                <option value="tsp">Teaspoons</option>
                <option value="gallon">Gallons</option>
                <option value="bottle">Bottles</option>
                <option value="box">Boxes</option>
                <option value="can">Cans</option>
                <option value="pack">Packs</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              value={selectedItem.category}
              onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Bakery">Bakery</option>
              <option value="Grains">Grains & Pasta</option>
              <option value="Canned">Canned Goods</option>
              <option value="Frozen">Frozen Foods</option>
              <option value="Beverages">Beverages</option>
              <option value="Condiments">Condiments</option>
              <option value="Snacks">Snacks</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input 
              type="date" 
              value={selectedItem.expiryDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedItem({...selectedItem, expiryDate: new Date(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              value={selectedItem.status}
              onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value as any})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="empty">Empty</option>
              <option value="expired">Expired</option>
              <option value="fresh">Fresh</option>
            </select>
          </div>
          
          <div className="flex justify-between space-x-3 pt-4">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  handleDeleteItem(selectedItem.id);
                  onClose();
                }
              }}
              className="px-4 py-2 rounded-md bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleEditItem}
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditItemModal;

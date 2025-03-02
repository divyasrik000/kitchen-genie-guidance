
import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import InventoryItem, { InventoryItemType } from '@/components/ui/InventoryItem';
import ScanModal from '@/components/ui/ScanModal';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, ScanLine, ChefHat, Calendar, Trash2, Edit, X } from 'lucide-react';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@/components/ui/dialog';

const Inventory = () => {
  const { items, scanItem, addItem, updateItem, removeItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItemType | null>(null);
  const [newItem, setNewItem] = useState<Partial<InventoryItemType>>({
    name: '',
    quantity: 1,
    unit: 'pcs',
    category: 'Other',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'medium',
  });
  
  const navigate = useNavigate();
  
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
  
  const handleAddItem = () => {
    if (!newItem.name) {
      toast.error('Please enter a name for the item');
      return;
    }
    
    addItem({
      name: newItem.name || '',
      quantity: newItem.quantity || 1,
      unit: newItem.unit || 'pcs',
      category: newItem.category || 'Other',
      expiryDate: newItem.expiryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      addedDate: new Date(),
      status: newItem.status || 'medium',
      barcode: newItem.barcode,
    });
    
    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      quantity: 1,
      unit: 'pcs',
      category: 'Other',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'medium',
    });
    toast.success('Item added successfully!');
  };
  
  const handleEditItem = () => {
    if (!selectedItem) return;
    
    updateItem(selectedItem.id, selectedItem);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    toast.success('Item updated successfully!');
  };
  
  const handleDeleteItem = (id: string) => {
    removeItem(id);
    toast.success('Item removed from inventory');
  };
  
  const handleItemClick = (item: InventoryItemType) => {
    setSelectedItem({...item});
    setIsEditModalOpen(true);
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
      </div>
      
      {filteredItems.length === 0 ? (
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
              onClick={() => setIsScanModalOpen(true)}
            >
              <ScanLine className="h-5 w-5 mr-2" />
              <span>Scan Items</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-secondary text-white flex items-center justify-center"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              <span>Add Item Manually</span>
            </motion.button>
          </div>
        </BlurredBackground>
      ) : (
        <div className="space-y-8">
          {Object.entries(categorizedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <InventoryItem 
                      item={item} 
                      onClick={() => handleItemClick(item)}
                    />
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                        className="p-1.5 rounded-full bg-accent/80 hover:bg-accent text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
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
      )}
      
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
        onClick={() => setIsAddModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
      
      {/* Scan Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
      
      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Item</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
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
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Item name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <input 
                    type="number" 
                    value={newItem.quantity || 1}
                    onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Unit</label>
                  <select 
                    value={newItem.unit || 'pcs'}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
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
                  value={newItem.category || 'Other'}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
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
                  value={newItem.expiryDate ? newItem.expiryDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewItem({...newItem, expiryDate: new Date(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  value={newItem.status || 'medium'}
                  onChange={(e) => setNewItem({...newItem, status: e.target.value as any})}
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
              
              <div>
                <label className="block text-sm font-medium mb-1">Barcode (optional)</label>
                <input 
                  type="text" 
                  value={newItem.barcode || ''}
                  onChange={(e) => setNewItem({...newItem, barcode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Item barcode"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
                >
                  Add Item
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Edit Item Modal */}
      {isEditModalOpen && selectedItem && (
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
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedItem(null);
                }}
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
                      setIsEditModalOpen(false);
                      setSelectedItem(null);
                    }
                  }}
                  className="px-4 py-2 rounded-md bg-destructive text-white hover:bg-destructive/90"
                >
                  Delete
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedItem(null);
                    }}
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
      )}
    </div>
  );
};

export default Inventory;

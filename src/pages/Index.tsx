
import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { InventoryItemType } from '@/components/ui/InventoryItem';
import ScanModal from '@/components/ui/ScanModal';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, ScanLine, Calendar } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import BlurredBackground from '@/components/ui/BlurredBackground';

// Import our components
import InventorySearchControls from '@/components/inventory/InventorySearchControls';
import EmptyInventory from '@/components/inventory/EmptyInventory';
import InventoryItemsList from '@/components/inventory/InventoryItemsList';
import AddItemModal from '@/components/inventory/AddItemModal';
import EditItemModal from '@/components/inventory/EditItemModal';

const Inventory = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate('/plan-meals')}
          >
            <Calendar className="h-5 w-5 mr-2" />
            <span>Plan Meals</span>
          </motion.button>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <EmptyInventory
          onScanClick={() => setIsScanModalOpen(true)}
          onAddClick={() => setIsAddModalOpen(true)}
        />
      ) : (
        <InventoryItemsList
          categorizedItems={categorizedItems}
          onItemClick={handleItemClick}
          onDeleteItem={handleDeleteItem}
        />
      )}
      
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
        onClick={() => setIsAddModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
      
      {/* Modals */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
      
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
      />
      
      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default Inventory;

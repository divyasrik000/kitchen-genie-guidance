
import { create } from 'zustand';
import { InventoryItemType } from '@/components/ui/InventoryItem';

interface InventoryState {
  items: InventoryItemType[];
  isLoading: boolean;
  error: string | null;
  addItem: (item: Omit<InventoryItemType, 'id'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItemType>) => void;
  removeItem: (id: string) => void;
  scanItem: (barcode: string) => Promise<InventoryItemType | null>;
}

// Mock data for demonstration
const mockInventoryItems: InventoryItemType[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: 1,
    unit: 'gallon',
    category: 'Dairy',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'medium',
    barcode: '123456789012',
  },
  {
    id: '2',
    name: 'Eggs',
    quantity: 12,
    unit: 'pcs',
    category: 'Dairy',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    addedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'high',
    barcode: '223456789012',
  },
  {
    id: '3',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    addedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'low',
    barcode: '323456789012',
  },
  {
    id: '4',
    name: 'Apples',
    quantity: 5,
    unit: 'pcs',
    category: 'Fruits',
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'medium',
    barcode: '423456789012',
  },
  {
    id: '5',
    name: 'Chicken Breast',
    quantity: 2,
    unit: 'lbs',
    category: 'Meat',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    addedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'low',
    barcode: '523456789012',
  },
];

// Mock database of items that could be scanned
const mockBarcodeDatabase: Record<string, Omit<InventoryItemType, 'id'>> = {
  '123456789012': {
    name: 'Milk',
    quantity: 1,
    unit: 'gallon',
    category: 'Dairy',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
    status: 'high',
    barcode: '123456789012',
  },
  '223456789012': {
    name: 'Eggs',
    quantity: 12,
    unit: 'pcs',
    category: 'Dairy',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    addedDate: new Date(),
    status: 'high',
    barcode: '223456789012',
  },
  // Add more mock products...
};

export const useInventory = create<InventoryState>((set, get) => ({
  items: mockInventoryItems,
  isLoading: false,
  error: null,
  
  addItem: (item) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 11),
    };
    
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },
  
  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map((item) => 
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  scanItem: async (barcode) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (mockBarcodeDatabase[barcode]) {
        const newItem = {
          ...mockBarcodeDatabase[barcode],
          id: Math.random().toString(36).substring(2, 11),
        };
        
        set((state) => ({
          items: [...state.items, newItem],
          isLoading: false,
        }));
        
        return newItem;
      } else {
        // Item not found in database
        set({
          isLoading: false,
          error: 'Product not found. Please add it manually.',
        });
        return null;
      }
    } catch (error) {
      set({
        isLoading: false,
        error: 'Failed to scan item. Please try again.',
      });
      return null;
    }
  },
}));

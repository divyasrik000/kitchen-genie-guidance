
import React, { useState } from 'react';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Search, Plus, ChefHat, Clock, Star, Filter } from 'lucide-react';

interface CookedItem {
  id: string;
  name: string;
  lastCooked: Date;
  frequency: number;
  rating: number;
  image?: string;
  tags: string[];
}

const MOCK_COOKED_ITEMS: CookedItem[] = [
  {
    id: '1',
    name: 'Spaghetti Bolognese',
    lastCooked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    frequency: 8,
    rating: 4.5,
    tags: ['Italian', 'Pasta', 'Family Favorite'],
  },
  {
    id: '2',
    name: 'Chicken Curry',
    lastCooked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    frequency: 5,
    rating: 5,
    tags: ['Indian', 'Spicy', 'Dinner'],
  },
  {
    id: '3',
    name: 'Greek Salad',
    lastCooked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    frequency: 12,
    rating: 4,
    tags: ['Greek', 'Salad', 'Healthy', 'Quick'],
  },
  {
    id: '4',
    name: 'Chocolate Chip Cookies',
    lastCooked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    frequency: 3,
    rating: 5,
    tags: ['Dessert', 'Baking', 'Sweet'],
  },
];

const CookedItems = () => {
  const [items] = useState<CookedItem[]>(MOCK_COOKED_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Cooked Items</h1>
          <p className="text-muted-foreground mt-2">
            See and manage the meals you've cooked previously
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
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <BlurredBackground className="p-8 text-center">
          <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No cooked items yet</h2>
          <p className="text-muted-foreground mb-6">
            Add your first cooked item to start building your history
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-primary text-white flex items-center mx-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Cooked Item</span>
          </motion.button>
        </BlurredBackground>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-card p-4 hover-scale"
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  
                  <div className="flex items-center mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">
                      Last cooked: {formatDate(item.lastCooked)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-muted-foreground">
                      Cooked {item.frequency} times
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-amber-500 fill-amber-500'
                            : i < item.rating
                            ? 'text-amber-500 fill-amber-500 opacity-50'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-accent flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ChefHat className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs bg-accent rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
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
    </div>
  );
};

export default CookedItems;


import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Calendar, ShoppingCart, Check, Plus, Search, Filter, Utensils, ListCheck } from 'lucide-react';
import { toast } from 'sonner';

interface MealItem {
  id: string;
  name: string;
  ingredients: string[];
}

interface PlanItem {
  id: string;
  date: Date;
  meal: 'breakfast' | 'lunch' | 'dinner';
  menuItem: string;
}

const FutureInventory = () => {
  const { items } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plannedMeals, setPlannedMeals] = useState<PlanItem[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  
  // Mock meal options
  const mealOptions: MealItem[] = [
    { 
      id: '1', 
      name: 'Avocado Toast', 
      ingredients: ['bread', 'avocado', 'eggs', 'salt', 'pepper'] 
    },
    { 
      id: '2', 
      name: 'Chicken Curry', 
      ingredients: ['chicken', 'curry paste', 'coconut milk', 'rice', 'onions'] 
    },
    { 
      id: '3', 
      name: 'Pasta Carbonara', 
      ingredients: ['pasta', 'eggs', 'cheese', 'bacon', 'black pepper'] 
    },
    { 
      id: '4', 
      name: 'Vegetable Stir Fry', 
      ingredients: ['tofu', 'broccoli', 'carrots', 'soy sauce', 'rice'] 
    }
  ];
  
  const filteredMeals = mealOptions.filter(meal => 
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const addToMealPlan = (meal: MealItem, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const newPlanItem: PlanItem = {
      id: Math.random().toString(36).substring(2, 11),
      date: new Date(selectedDate),
      meal: mealType,
      menuItem: meal.name
    };
    
    setPlannedMeals([...plannedMeals, newPlanItem]);
    toast.success(`Added ${meal.name} to ${mealType} on ${formatDate(selectedDate)}`);
    
    // Check if ingredients are in inventory and add missing ones to shopping list
    const inventoryItemNames = items.map(item => item.name.toLowerCase());
    const missingIngredients = meal.ingredients.filter(
      ingredient => !inventoryItemNames.includes(ingredient.toLowerCase())
    );
    
    if (missingIngredients.length > 0) {
      setShoppingList([...new Set([...shoppingList, ...missingIngredients])]);
    }
  };
  
  const removeFromShoppingList = (ingredient: string) => {
    setShoppingList(shoppingList.filter(item => item !== ingredient));
  };
  
  const changeDate = (daysToAdd: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + daysToAdd);
    setSelectedDate(newDate);
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Future Inventory Planning</h1>
          <p className="text-muted-foreground mt-2">
            Plan your meals ahead and create a shopping list for missing ingredients
          </p>
        </div>
        
        <div className="flex gap-2">
          <BlurredBackground className="flex items-center px-3 py-2 w-full md:w-auto">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search meals..."
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date Selection and Meal Planning */}
        <div className="lg:col-span-2 space-y-6">
          <BlurredBackground className="p-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => changeDate(-1)}
                className="p-2 rounded-lg hover:bg-accent"
              >
                &larr;
              </button>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
              </div>
              
              <button 
                onClick={() => changeDate(1)}
                className="p-2 rounded-lg hover:bg-accent"
              >
                &rarr;
              </button>
            </div>
            
            <div className="space-y-6">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType} className="space-y-2">
                  <h3 className="capitalize text-lg font-medium">{mealType}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plannedMeals
                      .filter(plan => 
                        plan.meal === mealType && 
                        plan.date.toDateString() === selectedDate.toDateString()
                      )
                      .map(plan => (
                        <div key={plan.id} className="p-3 rounded-lg bg-accent/50 flex items-center justify-between">
                          <div className="flex items-center">
                            <Utensils className="h-4 w-4 mr-2 text-primary" />
                            <span>{plan.menuItem}</span>
                          </div>
                        </div>
                      ))}
                      
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 rounded-lg border border-dashed border-accent flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add {mealType}</span>
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </BlurredBackground>
          
          <BlurredBackground className="p-6">
            <h2 className="text-xl font-semibold mb-4">Available Meal Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMeals.map(meal => (
                <motion.div
                  key={meal.id}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ingredients: {meal.ingredients.join(', ')}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                      <button
                        key={mealType}
                        onClick={() => addToMealPlan(meal, mealType as 'breakfast' | 'lunch' | 'dinner')}
                        className="text-xs px-2 py-1 rounded bg-primary/20 hover:bg-primary/30 transition-colors capitalize"
                      >
                        {mealType}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </BlurredBackground>
        </div>
        
        {/* Shopping List */}
        <div>
          <BlurredBackground className="p-6 sticky top-24">
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              <h2 className="text-xl font-semibold">Shopping List</h2>
            </div>
            
            {shoppingList.length === 0 ? (
              <div className="text-center p-6">
                <ListCheck className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Your shopping list is empty. Add meals to your plan to generate a shopping list.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {shoppingList.map(ingredient => (
                  <li key={ingredient} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50">
                    <span className="capitalize">{ingredient}</span>
                    <button
                      onClick={() => removeFromShoppingList(ingredient)}
                      className="p-1 rounded-full hover:bg-primary/20"
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            
            {shoppingList.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 py-2 rounded-lg bg-primary text-white flex items-center justify-center"
                onClick={() => {
                  toast.success('Shopping list copied to clipboard!');
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Export Shopping List</span>
              </motion.button>
            )}
          </BlurredBackground>
        </div>
      </div>
    </div>
  );
};

export default FutureInventory;

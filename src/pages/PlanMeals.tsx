import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory'; // Fixed import statement
import BlurredBackground from '@/components/ui/BlurredBackground';
import { motion } from 'framer-motion';
import { Calendar, Filter, ChefHat, Plus, Search } from 'lucide-react';

interface MealPlanItem {
  id: string;
  name: string;
  cuisine: string;
  ingredients: string[];
  image?: string;
}

const MOCK_MEAL_PLANS: MealPlanItem[] = [
  {
    id: '1',
    name: 'Mediterranean Quinoa Bowl',
    cuisine: 'Mediterranean',
    ingredients: ['quinoa', 'cucumber', 'tomatoes', 'feta cheese', 'olives', 'lemon vinaigrette'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599e7e268?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    id: '2',
    name: 'Spicy Tofu Stir-Fry',
    cuisine: 'Asian',
    ingredients: ['tofu', 'broccoli', 'carrots', 'bell peppers', 'soy sauce', 'ginger', 'garlic'],
    image: 'https://images.unsplash.com/photo-1619895862022-0914e75e64da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    id: '3',
    name: 'Black Bean Burgers',
    cuisine: 'American',
    ingredients: ['black beans', 'corn', 'onion', 'bread crumbs', 'spices', 'burger buns'],
    image: 'https://images.unsplash.com/photo-1571099704741-193e5a2f8b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
  },
];

const PlanMeals = () => {
  const { items } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [mealPlans] = useState<MealPlanItem[]>(MOCK_MEAL_PLANS);
  
  const filteredMealPlans = mealPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Meal Plans</h1>
          <p className="text-muted-foreground mt-2">
            Plan your meals for the week based on your inventory and preferences
          </p>
        </div>
        
        <div className="flex gap-2">
          <BlurredBackground className="flex items-center px-3 py-2 w-full md:w-auto">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search meal plans..."
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
      
      {filteredMealPlans.length === 0 ? (
        <BlurredBackground className="p-8 text-center">
          <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No meal plans found</h2>
          <p className="text-muted-foreground mb-6">
            Create your first meal plan to start organizing your meals
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-primary text-white flex items-center mx-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Meal Plan</span>
          </motion.button>
        </BlurredBackground>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMealPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-card p-4 hover-scale"
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cuisine: {plan.cuisine}
                  </p>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">Ingredients:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {plan.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-accent flex items-center justify-center">
                  {plan.image ? (
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ChefHat className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
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

export default PlanMeals;

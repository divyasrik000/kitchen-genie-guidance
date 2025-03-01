
import React, { useState } from 'react';
import BlurredBackground from '@/components/ui/BlurredBackground';
import RecipeCard, { RecipeType } from '@/components/ui/RecipeCard';
import { motion } from 'framer-motion';
import { Calendar, ShoppingCart, Filter, Plus, Check, Clock, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

type MealTime = 'breakfast' | 'lunch' | 'dinner';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface MealPlan {
  day: DayOfWeek;
  meals: Record<MealTime, RecipeType | null>;
}

const MOCK_RECIPES: RecipeType[] = [
  {
    id: '1',
    title: 'Greek Yogurt with Berries',
    description: 'A quick and healthy breakfast with protein-rich yogurt and fresh berries.',
    cookTime: 5,
    servings: 1,
    difficulty: 'easy',
    cuisine: 'American',
    ingredients: ['greek yogurt', 'berries', 'honey', 'granola'],
  },
  {
    id: '2',
    title: 'Chicken Caesar Salad',
    description: 'A classic Caesar salad with grilled chicken, romaine lettuce, and parmesan cheese.',
    cookTime: 20,
    servings: 2,
    difficulty: 'easy',
    cuisine: 'Italian',
    ingredients: ['chicken breast', 'romaine lettuce', 'parmesan cheese', 'croutons', 'caesar dressing'],
  },
  {
    id: '3',
    title: 'Beef Stir Fry',
    description: 'A quick and flavorful beef stir fry with vegetables and a savory sauce.',
    cookTime: 25,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Asian',
    ingredients: ['beef', 'bell peppers', 'broccoli', 'carrots', 'soy sauce', 'ginger', 'garlic'],
  },
  {
    id: '4',
    title: 'Avocado Toast',
    description: 'Simple and delicious avocado toast with a sprinkle of salt and red pepper flakes.',
    cookTime: 10,
    servings: 1,
    difficulty: 'easy',
    cuisine: 'American',
    ingredients: ['bread', 'avocado', 'salt', 'red pepper flakes', 'olive oil'],
  },
  {
    id: '5',
    title: 'Quinoa Bowl',
    description: 'A nutritious quinoa bowl with roasted vegetables and tahini dressing.',
    cookTime: 30,
    servings: 2,
    difficulty: 'medium',
    cuisine: 'Mediterranean',
    ingredients: ['quinoa', 'sweet potato', 'chickpeas', 'kale', 'tahini', 'lemon juice'],
  },
  {
    id: '6',
    title: 'Pasta Primavera',
    description: 'A light pasta dish with spring vegetables and a touch of lemon.',
    cookTime: 25,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Italian',
    ingredients: ['pasta', 'asparagus', 'peas', 'cherry tomatoes', 'parmesan cheese', 'lemon'],
  },
];

const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];

const MEAL_TIMES: MealTime[] = ['breakfast', 'lunch', 'dinner'];

const PlanMeals = () => {
  // Initialize meal plan with empty slots
  const [mealPlan, setMealPlan] = useState<MealPlan[]>(() => 
    DAYS_OF_WEEK.map(day => ({
      day,
      meals: {
        breakfast: null,
        lunch: null,
        dinner: null,
      },
    }))
  );
  
  const [activeDay, setActiveDay] = useState<DayOfWeek>('monday');
  const [activeMealTime, setActiveMealTime] = useState<MealTime>('breakfast');
  
  const handleSelectRecipe = (recipe: RecipeType) => {
    setMealPlan(prevPlan => 
      prevPlan.map(day => 
        day.day === activeDay 
          ? { ...day, meals: { ...day.meals, [activeMealTime]: recipe } }
          : day
      )
    );
    
    toast.success(`Added ${recipe.title} to ${activeDay}'s ${activeMealTime}`);
  };
  
  const handleClearMeal = (day: DayOfWeek, mealTime: MealTime) => {
    setMealPlan(prevPlan => 
      prevPlan.map(d => 
        d.day === day 
          ? { ...d, meals: { ...d.meals, [mealTime]: null } }
          : d
      )
    );
  };
  
  const activeDayPlan = mealPlan.find(day => day.day === activeDay);
  
  const getShoppingList = () => {
    // Here you would generate a shopping list from your meal plan
    toast.success("Shopping list generated! Check the inventory tab for missing items.");
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Meal Planning</h1>
          <p className="text-muted-foreground mt-2">
            Plan your meals for the week and generate a shopping list
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 rounded-lg glass-card">
            <Filter className="h-5 w-5" />
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-primary text-white flex items-center"
            onClick={getShoppingList}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>Generate Shopping List</span>
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BlurredBackground className="p-4">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">Weekly Plan</h2>
            </div>
            
            <div className="space-y-6">
              {mealPlan.map((day) => (
                <div key={day.day} className="space-y-2">
                  <h3 className="font-medium capitalize">{day.day}</h3>
                  
                  <div className="space-y-2">
                    {MEAL_TIMES.map((mealTime) => {
                      const recipe = day.meals[mealTime];
                      return (
                        <div 
                          key={mealTime}
                          className={`p-3 rounded-lg border transition-all ${
                            activeDay === day.day && activeMealTime === mealTime
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => {
                            setActiveDay(day.day);
                            setActiveMealTime(mealTime);
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm capitalize">{mealTime}</span>
                            {recipe && (
                              <button 
                                className="text-muted-foreground hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClearMeal(day.day, mealTime);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          {recipe ? (
                            <div className="mt-1">
                              <div className="font-medium">{recipe.title}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{recipe.cookTime} min</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center text-muted-foreground text-sm mt-1">
                              <Plus className="h-4 w-4 mr-1" />
                              <span>Add meal</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </BlurredBackground>
        </div>
        
        <div className="lg:col-span-2">
          <BlurredBackground className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold capitalize">
                  {activeMealTime} Ideas
                </h2>
                <ArrowRight className="h-4 w-4 mx-2" />
                <span className="text-lg capitalize">{activeDay}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_RECIPES.map((recipe) => (
                <div key={recipe.id} className="relative">
                  <RecipeCard recipe={recipe} onClick={handleSelectRecipe} />
                  {activeDayPlan?.meals[activeMealTime]?.id === recipe.id && (
                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </BlurredBackground>
        </div>
      </div>
    </div>
  );
};

export default PlanMeals;

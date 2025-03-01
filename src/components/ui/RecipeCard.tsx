
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat } from 'lucide-react';

export interface RecipeType {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  image?: string;
  ingredients: string[];
  missingIngredients?: string[];
}

interface RecipeCardProps {
  recipe: RecipeType;
  onClick?: (recipe: RecipeType) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="group glass-card overflow-hidden hover-scale"
      onClick={() => onClick?.(recipe)}
    >
      <div className="relative aspect-video overflow-hidden">
        {recipe.image ? (
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-accent flex items-center justify-center">
            <ChefHat className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white">
            {recipe.cuisine}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-medium text-balance line-clamp-1">{recipe.title}</h3>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.cookTime} min</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              recipe.difficulty === 'easy' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                : recipe.difficulty === 'medium'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </span>
          </div>
        </div>
        
        {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Missing ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missingIngredients.map((ingredient, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs bg-accent rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;

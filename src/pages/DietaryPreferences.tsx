
import React, { useState } from 'react';
import BlurredBackground from '@/components/ui/BlurredBackground';
import FeelingSelector from '@/components/ui/FeelingSelector';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle2, X, Plus } from 'lucide-react';
import { toast } from "sonner";

type Feeling = 'great' | 'good' | 'neutral' | 'gastric' | 'nauseous';
type DietaryPreference = 'vegetarian' | 'vegan' | 'pescatarian' | 'gluten-free' | 'dairy-free' | 'keto' | 'paleo' | 'low-carb';
type Allergen = 'nuts' | 'shellfish' | 'eggs' | 'dairy' | 'gluten' | 'soy' | 'fish';

const DietaryPreferences = () => {
  const [feeling, setFeeling] = useState<Feeling>('good');
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryPreference[]>([]);
  const [allergens, setAllergens] = useState<Allergen[]>(['nuts']);
  const [healthConditions, setHealthConditions] = useState<string[]>(['High blood pressure']);
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>(['Italian', 'Japanese', 'Mexican']);
  
  const allDietaryPreferences: DietaryPreference[] = [
    'vegetarian', 'vegan', 'pescatarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb',
  ];
  
  const allAllergens: Allergen[] = [
    'nuts', 'shellfish', 'eggs', 'dairy', 'gluten', 'soy', 'fish',
  ];
  
  const allCuisines = [
    'Italian', 'French', 'Japanese', 'Chinese', 'Indian', 'Thai', 'Mexican', 'Spanish', 
    'Greek', 'Lebanese', 'Turkish', 'Korean', 'Vietnamese',
  ];
  
  const toggleDietaryPreference = (preference: DietaryPreference) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
    }
  };
  
  const toggleAllergen = (allergen: Allergen) => {
    if (allergens.includes(allergen)) {
      setAllergens(allergens.filter(a => a !== allergen));
    } else {
      setAllergens([...allergens, allergen]);
    }
  };
  
  const toggleCuisine = (cuisine: string) => {
    if (cuisinePreferences.includes(cuisine)) {
      setCuisinePreferences(cuisinePreferences.filter(c => c !== cuisine));
    } else {
      setCuisinePreferences([...cuisinePreferences, cuisine]);
    }
  };
  
  const removeHealthCondition = (condition: string) => {
    setHealthConditions(healthConditions.filter(c => c !== condition));
  };
  
  const handleSave = () => {
    toast.success("Preferences saved successfully!");
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Dietary Preferences</h1>
          <p className="text-muted-foreground mt-2">
            Manage your dietary restrictions, allergies, and preferences
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-primary text-white flex items-center"
          onClick={handleSave}
        >
          <Save className="h-5 w-5 mr-2" />
          <span>Save Changes</span>
        </motion.button>
      </div>
      
      <div className="space-y-8">
        <BlurredBackground className="p-6">
          <FeelingSelector selectedFeeling={feeling} onChange={setFeeling} />
        </BlurredBackground>
        
        <BlurredBackground className="p-6">
          <h3 className="text-lg font-medium mb-4">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {allDietaryPreferences.map((preference) => (
              <button
                key={preference}
                onClick={() => toggleDietaryPreference(preference)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  dietaryPreferences.includes(preference)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                {preference.charAt(0).toUpperCase() + preference.slice(1)}
              </button>
            ))}
          </div>
        </BlurredBackground>
        
        <BlurredBackground className="p-6">
          <h3 className="text-lg font-medium mb-4">Allergies & Intolerances</h3>
          <div className="flex flex-wrap gap-2">
            {allAllergens.map((allergen) => (
              <button
                key={allergen}
                onClick={() => toggleAllergen(allergen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  allergens.includes(allergen)
                    ? 'bg-destructive text-white border-destructive'
                    : 'bg-background border-border hover:border-destructive/50'
                }`}
              >
                <AlertCircle className={`h-4 w-4 inline mr-1 ${
                  allergens.includes(allergen) ? '' : 'text-muted-foreground'
                }`} />
                {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
              </button>
            ))}
          </div>
        </BlurredBackground>
        
        <BlurredBackground className="p-6">
          <h3 className="text-lg font-medium mb-4">Health Conditions</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {healthConditions.map((condition) => (
              <div
                key={condition}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-accent flex items-center"
              >
                <span>{condition}</span>
                <button 
                  className="ml-2 text-muted-foreground hover:text-foreground"
                  onClick={() => removeHealthCondition(condition)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="px-3 py-2 rounded-lg text-sm font-medium border border-dashed border-muted-foreground text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
            <Plus className="h-4 w-4 inline mr-1" />
            Add Health Condition
          </button>
        </BlurredBackground>
        
        <BlurredBackground className="p-6">
          <h3 className="text-lg font-medium mb-4">Cuisine Preferences</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {allCuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => toggleCuisine(cuisine)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  cuisinePreferences.includes(cuisine)
                    ? 'bg-primary/10 border-primary'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                {cuisinePreferences.includes(cuisine) && (
                  <CheckCircle2 className="h-4 w-4 inline mr-1 text-primary" />
                )}
                {cuisine}
              </button>
            ))}
          </div>
        </BlurredBackground>
      </div>
    </div>
  );
};

export default DietaryPreferences;


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCircle, CalendarIcon, Plus, ListChecks, Utensils } from "lucide-react";
import { format } from "date-fns";
import useInventory from "@/hooks/useInventory";
import BlurredBackground from "@/components/ui/BlurredBackground";
import { motion } from "framer-motion";

const mealPlannerSteps = [
  "Select a date range for your meal plan",
  "Choose your preferred cuisines",
  "Set dietary preferences",
  "Review and customize your plan"
];

type MealPlan = {
  date: Date;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string[];
  };
};

const PlanMeals = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [cuisineType, setCuisineType] = useState<string>("");
  const [generatedPlan, setGeneratedPlan] = useState<MealPlan[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { inventory } = useInventory();

  const availableIngredients = inventory.map(item => item.name);

  // Cuisines options
  const cuisines = [
    "Italian", "Mexican", "Asian", "Mediterranean", 
    "Indian", "American", "French", "Middle Eastern"
  ];

  // Preference options  
  const preferenceOptions = [
    "Vegetarian", "Vegan", "Low Carb", "High Protein", 
    "Gluten Free", "Dairy Free", "Low Calorie", "Keto"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleGeneratePlan();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Sample generated meal plan
      const samplePlan: MealPlan[] = [
        {
          date: new Date(),
          meals: {
            breakfast: "Avocado Toast with Eggs",
            lunch: "Quinoa Salad with Grilled Chicken",
            dinner: "Baked Salmon with Roasted Vegetables",
            snacks: ["Greek Yogurt with Berries", "Almonds"]
          }
        },
        {
          date: new Date(Date.now() + 86400000), // +1 day
          meals: {
            breakfast: "Overnight Oats with Fruit",
            lunch: "Mediterranean Wrap",
            dinner: "Vegetable Stir Fry with Tofu",
            snacks: ["Hummus with Carrots", "Apple with Peanut Butter"]
          }
        },
        {
          date: new Date(Date.now() + 172800000), // +2 days
          meals: {
            breakfast: "Smoothie Bowl",
            lunch: "Lentil Soup with Whole Grain Bread",
            dinner: "Stuffed Bell Peppers",
            snacks: ["Trail Mix", "Cottage Cheese with Fruit"]
          }
        }
      ];
      
      setGeneratedPlan(samplePlan);
      setIsGenerating(false);
    }, 2000);
  };

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="date">Select Planning Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <Label>Select Cuisine Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={cuisineType === cuisine ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setCuisineType(cuisine)}
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <Label>Select Dietary Preferences</Label>
            <div className="grid grid-cols-2 gap-2">
              {preferenceOptions.map((pref) => (
                <Button
                  key={pref}
                  variant={preferences.includes(pref) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => togglePreference(pref)}
                >
                  {pref}
                </Button>
              ))}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Planning Date</h3>
              <p className="text-sm text-muted-foreground">{date ? format(date, "PPP") : "Not selected"}</p>
            </div>
            
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Cuisine</h3>
              <p className="text-sm text-muted-foreground">{cuisineType || "Not selected"}</p>
            </div>
            
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Preferences</h3>
              {preferences.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {preferences.map(pref => (
                    <span key={pref} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {pref}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No preferences selected</p>
              )}
            </div>
            
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Available Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                {availableIngredients.length > 0 
                  ? `${availableIngredients.length} items available in inventory`
                  : "No ingredients in inventory"}
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BlurredBackground className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Meal Planner</h1>
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {mealPlannerSteps.map((stepText, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${idx + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {idx + 1 < step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs text-center max-w-[100px] ${idx + 1 <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                    {stepText}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{mealPlannerSteps[step - 1]}</CardTitle>
              <CardDescription>
                Step {step} of {mealPlannerSteps.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                {step < 4 ? "Next" : "Generate Plan"}
              </Button>
            </CardFooter>
          </Card>
          
          {generatedPlan.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Your Meal Plan</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {generatedPlan.map((day, idx) => (
                  <Card key={idx} className="hover-scale">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{format(day.date, "EEEE")}</CardTitle>
                      <CardDescription>{format(day.date, "MMM d")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-medium flex items-center"><Utensils className="h-3 w-3 mr-2" /> Breakfast</h4>
                        <p className="text-sm text-muted-foreground">{day.meals.breakfast}</p>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center"><Utensils className="h-3 w-3 mr-2" /> Lunch</h4>
                        <p className="text-sm text-muted-foreground">{day.meals.lunch}</p>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center"><Utensils className="h-3 w-3 mr-2" /> Dinner</h4>
                        <p className="text-sm text-muted-foreground">{day.meals.dinner}</p>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center"><ListChecks className="h-3 w-3 mr-2" /> Snacks</h4>
                        <ul className="text-sm text-muted-foreground">
                          {day.meals.snacks.map((snack, idx) => (
                            <li key={idx}>{snack}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {isGenerating && (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-pulse text-center">
                <p className="text-lg font-medium">Creating your personalized meal plan...</p>
                <p className="text-sm text-muted-foreground">This may take a moment</p>
              </div>
            </div>
          )}
        </BlurredBackground>
      </motion.div>
    </div>
  );
};

export default PlanMeals;

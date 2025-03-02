
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const Home = () => {
  const [animationState, setAnimationState] = React.useState('initial');
  
  useEffect(() => {
    // Start the animation sequence
    const sequence = async () => {
      // Initial delay before starting animation
      setTimeout(() => setAnimationState('genie-entering'), 500);
      setTimeout(() => setAnimationState('plate-opening'), 2000);
      setTimeout(() => setAnimationState('flames'), 2500);
      setTimeout(() => setAnimationState('disappearing'), 3500);
      setTimeout(() => setAnimationState('logo-only'), 4000);
      setTimeout(() => setAnimationState('content'), 5000);
    };
    
    sequence();
  }, []);
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto relative min-h-[80vh] flex flex-col items-center justify-center">
      
      {/* Animation Container */}
      <div className="w-full h-[50vh] relative mb-8 flex items-center justify-center">
        <AnimatePresence>
          {/* Genie Animation */}
          {animationState !== 'logo-only' && animationState !== 'content' && (
            <motion.div 
              className="absolute"
              initial={{ x: -100, opacity: 0 }}
              animate={animationState === 'initial' ? { x: -100, opacity: 0 } : 
                       animationState === 'genie-entering' ? { x: 0, opacity: 1 } :
                       animationState === 'disappearing' ? { x: 0, opacity: 0, scale: 0.8 } :
                       { x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="relative">
                {/* Genie Character */}
                <motion.div 
                  className="w-40 h-60 bg-primary/90 rounded-full flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="w-36 h-56 bg-primary rounded-full flex items-center justify-center relative">
                    {/* Genie Face */}
                    <div className="absolute top-10 flex flex-col items-center">
                      <div className="flex space-x-8 mb-2">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div className="w-8 h-1 bg-white rounded-full mt-3"></div>
                    </div>
                    
                    {/* Covered Plate */}
                    <motion.div 
                      className="absolute bottom-0 translate-y-1/2 w-36 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-xl"
                      animate={animationState === 'plate-opening' ? 
                              { rotateX: 180, y: 20 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {animationState !== 'plate-opening' && 
                       animationState !== 'flames' && 
                       animationState !== 'disappearing' && (
                        <span className="text-gray-500 font-semibold">FOOD</span>
                      )}
                    </motion.div>
                    
                    {/* Food with Flames */}
                    {(animationState === 'plate-opening' || 
                      animationState === 'flames' || 
                      animationState === 'disappearing') && (
                      <motion.div 
                        className="absolute bottom-0 translate-y-2/3 w-32 h-16 bg-amber-300 rounded-t-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Flames */}
                        {(animationState === 'flames' || animationState === 'disappearing') && (
                          <div className="relative h-full w-full">
                            <motion.div 
                              className="absolute bottom-full left-1/4 w-4 h-10 bg-orange-500 rounded-full blur-sm"
                              animate={{ 
                                height: [10, 20, 10],
                                y: [0, -10, 0] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.5,
                                repeatType: "reverse" 
                              }}
                            />
                            <motion.div 
                              className="absolute bottom-full left-1/2 w-4 h-14 bg-red-500 rounded-full blur-sm"
                              animate={{ 
                                height: [14, 24, 14],
                                y: [0, -15, 0] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.7,
                                repeatType: "reverse",
                                delay: 0.1
                              }}
                            />
                            <motion.div 
                              className="absolute bottom-full left-3/4 w-4 h-8 bg-orange-400 rounded-full blur-sm"
                              animate={{ 
                                height: [8, 18, 8],
                                y: [0, -8, 0] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.6,
                                repeatType: "reverse",
                                delay: 0.2
                              }}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                {/* Genie Trail/Smoke */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-primary/30 rounded-full blur-lg"
                  animate={{ 
                    width: [16, 30, 16],
                    height: [20, 40, 20],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    repeatType: "reverse" 
                  }}
                />
              </div>
            </motion.div>
          )}
          
          {/* Logo Display (after animation) */}
          {(animationState === 'logo-only' || animationState === 'content') && (
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ChefHat className="h-24 w-24 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-2">KitchenGenie</h1>
              <p className="text-xl text-muted-foreground">Your magical kitchen assistant</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Content (appears after animation) */}
      <AnimatePresence>
        {animationState === 'content' && (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <ChefHat className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Inventory Management</h2>
                </div>
                <p className="text-muted-foreground mb-2">Track all your ingredients with our smart inventory system</p>
                <p className="text-muted-foreground">Get notified when items are about to expire</p>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                    <ChefHat className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="text-xl font-semibold">Recipe Suggestions</h2>
                </div>
                <p className="text-muted-foreground mb-2">Get personalized recipe ideas based on your inventory</p>
                <p className="text-muted-foreground">Never waste food again!</p>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <ChefHat className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Meal Planning</h2>
                </div>
                <p className="text-muted-foreground mb-2">Plan your meals for the week ahead</p>
                <p className="text-muted-foreground">Smart shopping lists based on your meal plans</p>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Welcome to KitchenGenie</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your magical kitchen assistant that helps you manage your food inventory, 
                suggests recipes, and reduces food waste. Let's get started!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors">
                  <h3 className="font-semibold mb-2">Scan & Add Ingredients</h3>
                  <p className="text-sm text-muted-foreground">
                    Use our barcode scanner to quickly add items to your inventory
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 cursor-pointer transition-colors">
                  <h3 className="font-semibold mb-2">Get Recipe Ideas</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover new recipes based on what you have in your kitchen
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/10 hover:bg-accent/20 cursor-pointer transition-colors">
                  <h3 className="font-semibold mb-2">Track Expiry Dates</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about items that are about to expire
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors">
                  <h3 className="font-semibold mb-2">Plan Your Meals</h3>
                  <p className="text-sm text-muted-foreground">
                    Create meal plans and shopping lists effortlessly
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

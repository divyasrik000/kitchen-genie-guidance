
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Utensils, Flame } from 'lucide-react';

const Home = () => {
  const [animationState, setAnimationState] = React.useState('initial');
  
  useEffect(() => {
    // Start the animation sequence
    const sequence = async () => {
      // Initial delay before starting animation
      setTimeout(() => setAnimationState('lamp-rubbing'), 500);
      setTimeout(() => setAnimationState('genie-emerging'), 1500);
      setTimeout(() => setAnimationState('genie-entering'), 2500);
      setTimeout(() => setAnimationState('plate-presenting'), 3500);
      setTimeout(() => setAnimationState('plate-opening'), 4000);
      setTimeout(() => setAnimationState('flames'), 4500);
      setTimeout(() => setAnimationState('disappearing'), 5500);
      setTimeout(() => setAnimationState('logo-only'), 6000);
      setTimeout(() => setAnimationState('content'), 7000);
    };
    
    sequence();
  }, []);
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto relative min-h-[80vh] flex flex-col items-center justify-center">
      
      {/* Animation Container */}
      <div className="w-full h-[50vh] relative mb-8 flex items-center justify-center">
        <AnimatePresence>
          {/* Lamp Animation */}
          {(animationState === 'initial' || animationState === 'lamp-rubbing') && (
            <motion.div 
              className="absolute"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-32 h-20 bg-yellow-600 rounded-b-full relative"
                animate={animationState === 'lamp-rubbing' ? 
                  { x: [0, 5, -5, 5, -5, 0] } : {}}
                transition={{ duration: 1, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
              >
                {/* Lamp handle */}
                <div className="absolute top-[-15px] right-[10px] w-10 h-20 bg-yellow-600 rounded-t-full"></div>
                
                {/* Lamp spout */}
                <div className="absolute top-[-5px] left-[5px] w-20 h-10 bg-yellow-600 rounded-l-full transform -rotate-12"></div>
                
                {/* Lamp shine */}
                <motion.div 
                  className="absolute top-[5px] left-[15px] w-4 h-4 bg-yellow-200 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                ></motion.div>
              </motion.div>
              
              {animationState === 'lamp-rubbing' && (
                <motion.div 
                  className="absolute top-[-10px] left-[50%] w-20 h-10 bg-blue-400/30 rounded-full blur-md"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -20 }}
                  transition={{ repeat: 2, duration: 0.5 }}
                ></motion.div>
              )}
            </motion.div>
          )}
          
          {/* Genie Emerging Smoke */}
          {animationState === 'genie-emerging' && (
            <motion.div 
              className="absolute"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: -50, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-40 h-40 bg-blue-400/40 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.5, 1], 
                    opacity: [0.4, 0.7, 0.4] 
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                ></motion.div>
                <motion.div 
                  className="absolute top-[10px] left-[10px] w-30 h-30 bg-blue-500/40 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    opacity: [0.3, 0.6, 0.3] 
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                ></motion.div>
                <motion.div 
                  className="absolute top-[20px] left-[20px] w-20 h-20 bg-blue-600/40 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.4, 1], 
                    opacity: [0.2, 0.5, 0.2] 
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                ></motion.div>
              </div>
            </motion.div>
          )}
          
          {/* Genie Animation */}
          {(animationState === 'genie-entering' || 
            animationState === 'plate-presenting' ||
            animationState === 'plate-opening' ||
            animationState === 'flames' ||
            animationState === 'disappearing') && (
            <motion.div 
              className="absolute"
              initial={{ x: -100, opacity: 0, scale: 0.8 }}
              animate={
                animationState === 'genie-entering' ? { x: 0, opacity: 1, scale: 1 } :
                animationState === 'disappearing' ? { x: 0, opacity: 0, scale: 0.8, y: -50 } :
                { x: 0, opacity: 1, scale: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="relative">
                {/* Genie Character - Blue body with smoke tail */}
                <motion.div 
                  className="flex flex-col items-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {/* Genie head */}
                  <div className="relative z-20">
                    <div className="w-28 h-28 bg-blue-500 rounded-full flex items-center justify-center relative">
                      {/* Chef Hat */}
                      <div className="absolute -top-14 left-2 z-30">
                        <div className="w-24 h-8 bg-white rounded-md relative">
                          <div className="absolute -top-10 left-4 w-16 h-12 bg-white rounded-t-full"></div>
                        </div>
                      </div>
                      
                      {/* Face */}
                      <div className="absolute flex flex-col items-center z-30">
                        <div className="flex space-x-8 mb-2">
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                          </div>
                        </div>
                        <div className="w-12 h-1 bg-white rounded-full mt-3"></div>
                        <div className="w-16 h-3 bg-white rounded-full mt-5 flex items-center justify-center">
                          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Genie body */}
                  <div className="w-44 h-44 bg-blue-500 rounded-full -mt-10 relative z-10">
                    {/* Arms */}
                    <div className="absolute top-10 -left-16 w-16 h-8 bg-blue-500 rounded-full transform rotate-45"></div>
                    <div className="absolute top-10 -right-16 w-16 h-8 bg-blue-500 rounded-full transform -rotate-45"></div>
                    
                    {/* Chef apron */}
                    <div className="absolute top-5 left-8 w-28 h-36 bg-white rounded-t-lg"></div>
                    
                    {/* Spoon in hand */}
                    <motion.div 
                      className="absolute top-2 -left-30 transform rotate-45"
                      animate={{ rotate: [45, 35, 45] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-6 h-16 bg-gray-300 rounded-b-full"></div>
                      <div className="w-10 h-10 bg-gray-300 rounded-full -mt-4 ml-[-2px]"></div>
                    </motion.div>
                  </div>
                  
                  {/* Genie smoke/trail tail */}
                  <div className="w-36 h-40 bg-blue-400 rounded-t-full -mt-10 relative">
                    <motion.div 
                      className="absolute bottom-0 left-0 w-36 h-20 bg-blue-300 rounded-full"
                      animate={{ 
                        width: [36, 45, 36],
                        x: [-5, 5, -5]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-4 w-28 h-30 bg-blue-400 rounded-full opacity-80"
                      animate={{ 
                        width: [28, 36, 28],
                        x: [5, -5, 5]
                      }}
                      transition={{ repeat: Infinity, duration: 2.3, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-8 w-20 h-25 bg-blue-500 rounded-full opacity-80"
                      animate={{ 
                        width: [20, 28, 20],
                        x: [-3, 3, -3]
                      }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }}
                    ></motion.div>
                    
                    <motion.div 
                      className="absolute bottom-[-20px] left-[18%] w-24 h-30 bg-blue-400/60 rounded-full blur-md"
                      animate={{ 
                        width: [24, 36, 24],
                        height: [30, 40, 30],
                        opacity: [0.6, 0.3, 0.6]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.div>
                  </div>
                </motion.div>
                
                {/* Covered Plate with food */}
                {(animationState === 'plate-presenting' || 
                 animationState === 'plate-opening' || 
                 animationState === 'flames' || 
                 animationState === 'disappearing') && (
                  <motion.div
                    className="absolute top-[50px] right-[-70px]"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Silver serving plate */}
                    <div className="w-48 h-10 bg-gray-300 rounded-full relative shadow-lg">
                      {/* Silver dome cover */}
                      <motion.div 
                        className="absolute -top-24 left-4 w-40 h-24 bg-gray-200 rounded-t-full overflow-hidden shadow-inner"
                        initial={{ rotateX: 0 }}
                        animate={animationState === 'plate-opening' || animationState === 'flames' || animationState === 'disappearing' ? 
                                { rotateX: 180, y: -20, opacity: animationState === 'disappearing' ? 0 : 1 } : 
                                { rotateX: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="absolute top-[5px] left-[18px] w-4 h-4 bg-gray-300 rounded-full"></div>
                      </motion.div>
                      
                      {/* Food - Chicken legs */}
                      {(animationState === 'plate-opening' || animationState === 'flames' || animationState === 'disappearing') && (
                        <motion.div 
                          className="absolute -top-16 left-10 flex space-x-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <div className="w-12 h-16 bg-amber-700 rounded-b-full transform rotate-12 relative">
                            <div className="absolute bottom-0 left-0 w-6 h-8 bg-amber-800 rounded-b-full"></div>
                            <div className="absolute top-0 left-2 w-8 h-8 bg-amber-600 rounded-t-full"></div>
                          </div>
                          <div className="w-12 h-16 bg-amber-700 rounded-b-full transform -rotate-12 relative">
                            <div className="absolute bottom-0 right-0 w-6 h-8 bg-amber-800 rounded-b-full"></div>
                            <div className="absolute top-0 right-2 w-8 h-8 bg-amber-600 rounded-t-full"></div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Flames from the hot food */}
                      {(animationState === 'flames' || animationState === 'disappearing') && (
                        <div className="absolute -top-24 left-14 flex space-x-3">
                          <motion.div 
                            className="w-4 h-16 bg-red-500 rounded-t-full blur-sm"
                            animate={{ 
                              height: [16, 24, 16],
                              y: [0, -10, 0] 
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 0.7,
                              repeatType: "reverse" 
                            }}
                          />
                          <motion.div 
                            className="w-4 h-20 bg-orange-500 rounded-t-full blur-sm"
                            animate={{ 
                              height: [20, 28, 20],
                              y: [0, -15, 0] 
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 0.8,
                              repeatType: "reverse",
                              delay: 0.1
                            }}
                          />
                          <motion.div 
                            className="w-4 h-14 bg-yellow-500 rounded-t-full blur-sm"
                            animate={{ 
                              height: [14, 22, 14],
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
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Logo Display (after animation) */}
          {(animationState === 'logo-only' || animationState === 'content') && (
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 0.8 }}
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

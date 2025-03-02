
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Welcome to <span className="text-primary">KitchenGenie</span>
        </motion.h1>
        <motion.p 
          className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Your magical kitchen assistant for inventory management and meal planning
        </motion.p>
      </div>
      
      <div className="w-full max-w-md aspect-square relative">
        {/* Plate */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-accent/30 border-2 border-accent backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
        />
        
        {/* Genie */}
        <motion.div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10"
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1, type: "spring" }}
        >
          <div className="relative">
            <ChefHat className="h-24 w-24 text-primary" />
            <Sparkles className="h-6 w-6 text-yellow-400 absolute top-0 right-0" />
          </div>
        </motion.div>
        
        {/* Cloche/Food Cover */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 bg-secondary/80 rounded-full"
          initial={{ y: 0, scale: 1 }}
          animate={{ 
            y: [-10, -150],
            scale: [1, 0.8],
            opacity: [1, 0]
          }}
          transition={{ 
            delay: 2.8,
            duration: 1, 
            times: [0, 1]
          }}
        />
        
        {/* Steam particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-white/80"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: Math.random() * 80 - 40,
              y: -100 - Math.random() * 50,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              delay: 3 + Math.random() * 0.5,
              duration: 1 + Math.random(),
              ease: "easeOut",
              times: [0, 0.3, 1]
            }}
          />
        ))}
        
        {/* Food items appearing */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center gap-2 w-32 h-32"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.5 }}
        >
          {['🥗', '🍗', '🍜', '🥘', '🍔', '🍕', '🥪', '🌮'].map((emoji, i) => (
            <motion.div
              key={i}
              className="text-3xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 3.2 + (i * 0.1),
                type: "spring",
                stiffness: 200
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-10 w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.8 }}
        >
          <p className="text-lg font-medium">Let's start cooking!</p>
          <motion.button
            className="mt-4 px-6 py-3 bg-primary text-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
          >
            Check Your Inventory
          </motion.button>
        </motion.div>
      </div>
      
      {/* Features */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        <div className="glass-card p-6">
          <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <BarChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Inventory</h3>
          <p className="text-muted-foreground">Keep track of all your ingredients and their expiry dates.</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Plan Meals</h3>
          <p className="text-muted-foreground">Plan your meals ahead and automatically generate shopping lists.</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Recipe Chat</h3>
          <p className="text-muted-foreground">Get personalized recipe recommendations based on your inventory.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;

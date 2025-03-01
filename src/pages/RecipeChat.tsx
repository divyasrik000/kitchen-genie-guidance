
import React, { useState, useRef, useEffect } from 'react';
import BlurredBackground from '@/components/ui/BlurredBackground';
import RecipeCard, { RecipeType } from '@/components/ui/RecipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizontal, Mic, Globe, ChefHat, Image, Clock } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  recipes?: RecipeType[];
}

const MOCK_RECIPES: RecipeType[] = [
  {
    id: '1',
    title: 'Tomato Basil Pasta',
    description: 'A simple and delicious pasta dish with fresh tomatoes and basil.',
    cookTime: 25,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Italian',
    ingredients: ['pasta', 'tomatoes', 'basil', 'garlic', 'olive oil', 'salt', 'pepper'],
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'A flavorful Indian dish with tender chicken in a creamy tomato sauce.',
    cookTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    ingredients: ['chicken', 'yogurt', 'tomatoes', 'cream', 'garam masala', 'cumin', 'coriander'],
    missingIngredients: ['garam masala', 'cream'],
  },
  {
    id: '3',
    title: 'Avocado Toast',
    description: 'A quick and healthy breakfast with creamy avocado on toasted bread.',
    cookTime: 10,
    servings: 1,
    difficulty: 'easy',
    cuisine: 'American',
    ingredients: ['bread', 'avocado', 'lemon juice', 'salt', 'pepper', 'red pepper flakes'],
  },
];

const RecipeChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your KitchenGenie. Tell me what you're in the mood for, or ask me to suggest recipes based on your inventory.",
      type: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const containsRecipeRequest = inputValue.toLowerCase().includes('recipe') || 
        inputValue.toLowerCase().includes('make') ||
        inputValue.toLowerCase().includes('cook');
      
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: containsRecipeRequest 
          ? "Based on your inventory and preferences, here are some recipes you might enjoy:"
          : "I found these recipes that match your criteria. Would you like me to suggest alternatives or explain any of these in more detail?",
        type: 'assistant',
        timestamp: new Date(),
        recipes: containsRecipeRequest ? MOCK_RECIPES : undefined,
      };
      
      setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
    }, 1500);
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate speech recognition
      setTimeout(() => {
        setInputValue('I want to make something with pasta and tomatoes');
        setIsListening(false);
      }, 3000);
    }
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold">Recipe Chat</h1>
            <p className="text-muted-foreground mt-2">
              Get personalized recipe suggestions and cooking help
            </p>
          </div>
          
          <button className="p-2 rounded-lg glass-card">
            <Globe className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 glass-card p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col">
                <div className={`flex items-start ${message.type === 'user' ? 'justify-end' : ''}`}>
                  {message.type === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white mr-2">
                      <ChefHat className="h-5 w-5" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.type === 'user' 
                        ? 'bg-primary text-white rounded-tr-none ml-auto'
                        : 'bg-accent rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                
                {message.recipes && (
                  <div className="mt-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {message.recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <BlurredBackground className="flex items-center p-2">
          <button className="p-2 rounded-full hover:bg-accent transition-colors">
            <Image className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Ask about recipes or cooking tips..."
            className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <AnimatePresence initial={false} mode="wait">
            {isListening ? (
              <motion.button
                key="listening"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={toggleListening}
                className="p-2 rounded-full bg-red-500 text-white"
              >
                <Mic className="h-5 w-5 animate-pulse" />
              </motion.button>
            ) : (
              <motion.button
                key="not-listening"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={toggleListening}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Mic className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`p-2 rounded-full ${
              inputValue.trim() 
                ? 'bg-primary text-white' 
                : 'bg-muted text-muted-foreground'
            } ml-1`}
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </BlurredBackground>
      </div>
    </div>
  );
};

export default RecipeChat;

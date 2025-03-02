import React from 'react';
import { 
  BarChart as BarChartIcon, 
  Calendar as CalendarIcon, 
  MessageCircle as MessageCircleIcon 
} from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome to your kitchen dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <BarChartIcon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Inventory Stats</h2>
          </div>
          <p className="text-muted-foreground mb-2">You have 24 items in your inventory</p>
          <p className="text-muted-foreground">3 items are expiring soon</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
              <CalendarIcon className="h-5 w-5 text-secondary" />
            </div>
            <h2 className="text-xl font-semibold">Meal Planning</h2>
          </div>
          <p className="text-muted-foreground mb-2">You have 2 meals planned for today</p>
          <p className="text-muted-foreground">5 meals planned for this week</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <MessageCircleIcon className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-xl font-semibold">Recipe Suggestions</h2>
          </div>
          <p className="text-muted-foreground mb-2">You can make 8 recipes with your current inventory</p>
          <p className="text-muted-foreground">Try our recipe chat for personalized suggestions</p>
        </div>
      </div>
      
      <div className="glass-card p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <p className="font-medium">Added 2 items to inventory</p>
              <p className="text-sm text-muted-foreground">Milk, Eggs</p>
            </div>
            <span className="text-sm text-muted-foreground">Today, 10:30 AM</span>
          </div>
          
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <p className="font-medium">Cooked Spaghetti Bolognese</p>
              <p className="text-sm text-muted-foreground">Used 5 ingredients</p>
            </div>
            <span className="text-sm text-muted-foreground">Yesterday, 7:15 PM</span>
          </div>
          
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <p className="font-medium">Created meal plan</p>
              <p className="text-sm text-muted-foreground">For the next 5 days</p>
            </div>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Expiring Soon</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">1d</span>
                </div>
                <span>Spinach</span>
              </div>
              <span className="text-sm text-muted-foreground">250g</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">2d</span>
                </div>
                <span>Chicken Breast</span>
              </div>
              <span className="text-sm text-muted-foreground">500g</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">3d</span>
                </div>
                <span>Greek Yogurt</span>
              </div>
              <span className="text-sm text-muted-foreground">1 container</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Recipe Suggestions</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 cursor-pointer">
              <p className="font-medium">Chicken Stir Fry</p>
              <p className="text-sm text-muted-foreground">Uses: Chicken Breast, Bell Peppers, Soy Sauce</p>
            </div>
            
            <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 cursor-pointer">
              <p className="font-medium">Greek Salad</p>
              <p className="text-sm text-muted-foreground">Uses: Cucumber, Tomatoes, Feta Cheese</p>
            </div>
            
            <div className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 cursor-pointer">
              <p className="font-medium">Spinach and Mushroom Omelette</p>
              <p className="text-sm text-muted-foreground">Uses: Eggs, Spinach, Mushrooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, BarChart, ShoppingCart, Heart, MessageCircle, Calendar, Menu, X, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: 'Home', path: '/home', icon: <Home className="h-5 w-5" /> },
    { name: 'Inventory', path: '/', icon: <BarChart className="h-5 w-5" /> },
    { name: 'Cooked Items', path: '/cooked-items', icon: <ChefHat className="h-5 w-5" /> },
    { name: 'Preferences', path: '/preferences', icon: <Heart className="h-5 w-5" /> },
    { name: 'Plan Meals', path: '/plan-meals', icon: <ShoppingCart className="h-5 w-5" /> },
    { name: 'Future Inventory', path: '/future-inventory', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Recipe Chat', path: '/recipe-chat', icon: <MessageCircle className="h-5 w-5" /> },
  ];
  
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 w-full glass-card z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link 
              to="/home" 
              className="flex items-center"
              onClick={(e) => handleNavClick('/home', e)}
            >
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold tracking-tight">KitchenGenie</span>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-accent rounded-full p-2 inline-flex items-center justify-center text-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-white shadow-md' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={(e) => handleNavClick(item.path, e)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 h-0.5 w-full left-0 bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 w-full backdrop-blur-lg bg-white/90 dark:bg-black/90 z-50 border-b border-white/20`}>
        <div className="px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-accent/50'
                }`}
                onClick={(e) => handleNavClick(item.path, e)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, BarChart, ShoppingCart, Heart, MessageCircle, Calendar, Menu, X, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'glass-card'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link 
              to="/home" 
              className="flex items-center transition-transform hover:scale-105"
              onClick={(e) => handleNavClick('/home', e)}
            >
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold tracking-tight">KitchenGenie</span>
            </Link>
          </div>
          
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="bg-accent/50 backdrop-blur-sm rounded-full p-2 inline-flex items-center justify-center focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                      isActive 
                        ? 'text-primary' 
                        : 'hover:bg-accent/30'
                    }`}
                    onClick={(e) => handleNavClick(item.path, e)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-background/95 border-b border-border"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: navItems.indexOf(item) * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-accent/20'
                      }`}
                      onClick={(e) => handleNavClick(item.path, e)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

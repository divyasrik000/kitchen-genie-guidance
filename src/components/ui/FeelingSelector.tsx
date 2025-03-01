
import React from 'react';
import { motion } from 'framer-motion';

type Feeling = 'great' | 'good' | 'neutral' | 'gastric' | 'nauseous';

interface FeelingSelectorProps {
  selectedFeeling: Feeling;
  onChange: (feeling: Feeling) => void;
}

const feelings: { id: Feeling; label: string; description: string }[] = [
  { id: 'great', label: 'Great', description: 'Feeling energetic and very well' },
  { id: 'good', label: 'Good', description: 'Feeling normal and healthy' },
  { id: 'neutral', label: 'Neutral', description: 'Feeling okay, nothing special' },
  { id: 'gastric', label: 'Gastric', description: 'Having digestive issues' },
  { id: 'nauseous', label: 'Nauseous', description: 'Feeling sick or queasy' }
];

const FeelingSelector: React.FC<FeelingSelectorProps> = ({ selectedFeeling, onChange }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {feelings.map((feeling) => (
          <motion.button
            key={feeling.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(feeling.id)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
              selectedFeeling === feeling.id
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <span className="font-medium mb-1">{feeling.label}</span>
            <span className="text-xs text-center text-muted-foreground">
              {feeling.description}
            </span>
            {selectedFeeling === feeling.id && (
              <motion.div
                layoutId="feelingIndicator"
                className="absolute inset-0 border-2 border-primary rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FeelingSelector;

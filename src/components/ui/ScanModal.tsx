
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@/components/ui/dialog';
import { X, Camera, Loader2 } from 'lucide-react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (barcode: string) => void;
}

const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    if (isOpen && !isScanning) {
      let timer: ReturnType<typeof setTimeout>;
      
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setIsScanning(true);
        // In a real app, we would initiate barcode scanning here
        // For demo purposes, we'll simulate a scan after 2 seconds
        timer = setTimeout(() => {
          const mockBarcode = Math.floor(Math.random() * 1000000000000).toString();
          onScanComplete(mockBarcode);
          setIsScanning(false);
          setCountdown(3);
        }, 2000);
      }
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, countdown, isScanning, onScanComplete]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg bg-card rounded-2xl overflow-hidden shadow-xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Scan Barcode</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
              {isScanning ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Camera className="h-10 w-10 mb-2" />
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Scanning...</span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-4xl font-bold">{countdown}</div>
                </div>
              )}
              
              {/* Scanner guides */}
              <div className="absolute inset-0 border-2 border-dashed border-white/50 m-8 rounded" />
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white rounded-br-lg" />
              </div>
              
              {/* Scanning animation */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    exit={{ top: '0%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-primary"
                  />
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-sm text-muted-foreground text-center mb-4">
              Position the barcode within the frame to scan.
            </p>
            
            <div className="flex justify-end">
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
};

export default ScanModal;

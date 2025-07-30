import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const duration = 2500; // Reduced to 2.5 seconds for better UX
    const interval = 30;
    const increment = (interval / duration) * 100;
    
    // Show sparkles after a short delay
    const sparkleTimer = setTimeout(() => setShowSparkles(true), 800);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          // Add a slight delay before completing
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(sparkleTimer);
      setIsVisible(false);
    };
  }, [onComplete]);

  // Animation variants for the logo
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  // Sparkle animation
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0.8],
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center px-6 overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <div className="w-full max-w-4xl relative">
            {/* Decorative elements */}
            {showSparkles && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-400"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={sparkleVariants}
                    style={{
                      left: `${10 + (i * 10) % 80}%`,
                      top: `${20 + (i * 12) % 60}%`,
                    }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                ))}
              </>
            )}
            
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.2,
                    delayChildren: 0.2 
                  } 
                }
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 z-10">
                {/* Logo with enhanced animation */}
                <motion.div 
                  variants={logoVariants}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-orange-400 rounded-2xl blur-md opacity-30 -z-10" />
                  <img 
                    src="/images/kaarya-mithr-logo.png" 
                    alt="Kaarya Mithr Logo"
                    className="drop-shadow-xl"
                    style={{
                      width: '180px',
                      height: 'auto',
                      borderRadius: '20px',
                      boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.1)',
                      border: '4px solid rgba(255, 255, 255, 0.8)'
                    }}
                  />
                </motion.div>

                {/* Text content with enhanced typography */}
                <motion.div 
                  className="flex flex-col"
                  variants={textVariants}
                >
                  <div className="flex flex-col">
                    <motion.h1 
                      className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800"
                      style={{
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: '0.9',
                        marginBottom: '0.25rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      Kaarya
                    </motion.h1>
                    <motion.h2 
                      className="text-5xl md:text-6xl font-extrabold"
                      style={{
                        fontFamily: '"Poppins", sans-serif',
                        lineHeight: '0.9',
                        marginBottom: '1rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        color: '#fb9123'
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      Mithr
                    </motion.h2>
                  </div>
                  
                  <motion.p 
                    className="text-lg md:text-xl leading-relaxed max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <span className="font-semibold text-green-700">Connecting Rural Talent</span>
                    <span className="mx-3 text-gray-300">•</span>
                    <span className="font-medium" style={{ color: '#fb9123' }}>Building Opportunities</span>
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Enhanced Progress Bar */}
            <motion.div 
              className="mt-12 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="h-2.5 bg-gray-100 rounded-full w-full max-w-md overflow-hidden border border-gray-200">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 via-green-400 to-orange-400 rounded-full relative"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </motion.div>
              </div>
              
              {/* Version Info with subtle animation */}
              <motion.div 
                className="mt-4 flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                <span className="text-xs text-gray-500 font-medium">v1.0.0</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-400">Loading your experience...</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
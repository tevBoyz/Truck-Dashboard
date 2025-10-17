import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-purple-700 to-purple-900"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-6 inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white backdrop-blur-sm"
        >
          <img src='/logo.png' className="w-50 h-50 text-accent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;

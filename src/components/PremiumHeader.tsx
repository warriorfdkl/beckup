import { motion } from 'framer-motion';

export default function PremiumHeader() {
  return (
    <motion.div
      className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-xl m-4 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex items-center justify-center mb-2"
      >
        <h2 className="text-white text-xl font-semibold">
          CalorieAI Премиум! <span className="text-2xl">💎</span>
        </h2>
      </motion.div>

      <p className="text-white/90 text-center text-sm mb-4">
        Получите неограниченный доступ к распознаванию на базе ИИ
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-white text-orange-500 font-semibold py-2 px-4 rounded-lg 
                 shadow-md bg-gradient-to-r from-white to-yellow-50"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Начать
      </motion.button>
    </motion.div>
  );
} 
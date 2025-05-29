import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <motion.div
      className="p-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={{
          rotate: [-5, 5, -5],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl mb-4"
      >
        👍
      </motion.div>
      
      <motion.p
        className="text-white/90 text-center"
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Нажмите 👍, чтобы получить первый отчет
      </motion.p>
    </motion.div>
  );
} 
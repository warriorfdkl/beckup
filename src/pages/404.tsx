import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-teal-400 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-white/90 mb-8">Страница не найдена</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Вернуться на главную
        </motion.button>
      </motion.div>
    </div>
  );
} 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const welcomePhrases = [
  "Зачем потеть в зале, если можно просто не жрать лишнего?",
  "Кубики пресса делаются на кухне, а не в спортзале.",
  "Зал строит мышцы. Питание показывает их. Хочешь чтобы было что показывать? Начни с тарелки."
];

export default function WelcomePage() {
  const router = useRouter();
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomePhrases.length);
    setPhrase(welcomePhrases[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-teal-400 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="w-full max-w-md"
      >
        <div className="h-2 bg-white/20 rounded-full mb-8">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "20%" }}
            transition={{ duration: 1.5 }}
            className="h-full bg-white rounded-full"
          />
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white text-center mb-4"
        >
          {phrase}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/90 text-center mb-8"
        >
          Персональный помощник для здорового питания
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/profile')}
          className="w-full bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Начать</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
} 
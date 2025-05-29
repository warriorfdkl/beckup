import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface GoalData {
  type: 'lose' | 'maintain' | 'gain';
  targetWeight?: number;
  timeframe?: number;
}

export default function GoalsPage() {
  const router = useRouter();
  const [goal, setGoal] = useState<GoalData>({
    type: 'maintain'
  });

  const goals = [
    { id: 'lose', emoji: '🏃‍♂️', title: 'Похудеть', color: 'from-red-400 to-red-500' },
    { id: 'maintain', emoji: '⚖️', title: 'Поддержать вес', color: 'from-blue-400 to-blue-500' },
    { id: 'gain', emoji: '💪', title: 'Набрать массу', color: 'from-green-400 to-green-500' }
  ];

  const handleSubmit = () => {
    router.push('/activity');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-teal-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        {/* Прогресс-бар */}
        <div className="h-2 bg-white/20 rounded-full mb-8">
          <motion.div
            initial={{ width: "40%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5 }}
            className="h-full bg-white rounded-full"
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          Ваша цель?
        </h1>

        <div className="space-y-4">
          {goals.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGoal({ type: item.id as GoalData['type'] })}
              className={`w-full p-6 rounded-xl bg-gradient-to-r ${item.color} 
                ${goal.type === item.id ? 'ring-4 ring-white' : 'opacity-80'}
                transition-all duration-200`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xl font-semibold text-white">{item.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {(goal.type === 'lose' || goal.type === 'gain') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-8 space-y-6"
          >
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <label className="text-white mb-2 block">Целевой вес (кг)</label>
              <input
                type="number"
                value={goal.targetWeight || ''}
                onChange={(e) => setGoal({ ...goal, targetWeight: parseInt(e.target.value) })}
                className="w-full bg-white/20 text-white p-2 rounded-lg"
                min="30"
                max="200"
              />
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <label className="text-white mb-2 block">Срок достижения (месяцев)</label>
              <input
                type="range"
                value={goal.timeframe || 3}
                onChange={(e) => setGoal({ ...goal, timeframe: parseInt(e.target.value) })}
                className="w-full"
                min="1"
                max="12"
                step="1"
              />
              <div className="text-white text-center mt-2">
                {goal.timeframe || 3} {goal.timeframe === 1 ? 'месяц' : 'месяцев'}
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-lg mt-8"
        >
          Далее
        </motion.button>
      </motion.div>
    </div>
  );
} 
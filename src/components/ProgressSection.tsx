import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

interface NutrientProgress {
  current: number;
  target: number;
  color: string;
  name: string;
}

export default function ProgressSection() {
  const [date, setDate] = useState('сегодня');
  const { getDailyCalories, getNutrientGoals } = useUser();
  
  const goals = getNutrientGoals();
  const dailyCalories = getDailyCalories();

  const nutrients: NutrientProgress[] = [
    { current: 0, target: goals.proteins, color: 'from-blue-400 to-blue-600', name: 'Белки' },
    { current: 0, target: goals.carbs, color: 'from-green-400 to-green-600', name: 'Углеводы' },
    { current: 0, target: goals.fats, color: 'from-orange-400 to-orange-600', name: 'Жиры' }
  ];

  const totalCalories = { current: 0, target: dailyCalories };
  const caloriesPercentage = (totalCalories.current / totalCalories.target) * 100;

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            Ваш прогресс <span className="text-2xl">📊</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/80 text-sm"
            onClick={() => {/* Добавить выбор даты */}}
          >
            {date}
          </motion.button>
        </div>

        <div className="space-y-4">
          {nutrients.map((nutrient, index) => (
            <motion.div
              key={nutrient.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex justify-between text-sm text-white/90 mb-1">
                <span>{nutrient.name}</span>
                <span>{nutrient.current}/{nutrient.target} г</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(nutrient.current / nutrient.target) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${nutrient.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Круговая диаграмма калорий */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-white/10"
              strokeWidth="16"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-blue-500"
              strokeWidth="16"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: caloriesPercentage / 100 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-3xl font-bold">{totalCalories.current}</span>
            <span className="text-sm text-white/80">из {totalCalories.target} ккал</span>
            <span className="text-sm text-white/60">{Math.round(caloriesPercentage)}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 
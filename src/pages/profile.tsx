import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface ProfileData {
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number;
  weight: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    gender: 'male',
    age: 25,
    height: 170,
    weight: 70,
  });

  const handleSubmit = () => {
    // В реальном приложении здесь будет сохранение в localStorage или на сервер
    router.push('/goals');
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
            initial={{ width: "20%" }}
            animate={{ width: "40%" }}
            transition={{ duration: 1.5 }}
            className="h-full bg-white rounded-full"
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          Расскажите о себе
        </h1>

        <div className="space-y-6">
          {/* Выбор пола */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <label className="text-white mb-2 block">Пол</label>
            <div className="flex space-x-4">
              {['male', 'female', 'other'].map((gender) => (
                <motion.button
                  key={gender}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfile({ ...profile, gender: gender as ProfileData['gender'] })}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    profile.gender === gender ? 'bg-white text-blue-500' : 'bg-white/20 text-white'
                  }`}
                >
                  {gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚧'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Возраст */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <label className="text-white mb-2 block">Возраст</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
              className="w-full bg-white/20 text-white p-2 rounded-lg"
              min="12"
              max="100"
            />
          </div>

          {/* Рост */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <label className="text-white mb-2 block">Рост (см)</label>
            <input
              type="range"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) })}
              className="w-full"
              min="120"
              max="220"
              step="1"
            />
            <div className="text-white text-center mt-2">{profile.height} см</div>
          </div>

          {/* Вес */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <label className="text-white mb-2 block">Вес (кг)</label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: parseInt(e.target.value) })}
              className="w-full bg-white/20 text-white p-2 rounded-lg"
              min="30"
              max="200"
            />
          </div>

          {/* Кнопка "Далее" */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-lg mt-8"
          >
            Далее
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
} 
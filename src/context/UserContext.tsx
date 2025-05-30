import { createContext, useContext, useState, ReactNode } from 'react';

export type Goal = 'lose' | 'maintain' | 'gain';

interface UserData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'low' | 'medium' | 'high';
  goal: Goal;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  getDailyCalories: () => number;
  getNutrientGoals: () => {
    proteins: number;
    carbs: number;
    fats: number;
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const calculateBMR = () => {
    if (!userData) return 0;

    // Формула Миффлина-Сан Жеора
    const { weight, height, age, gender } = userData;
    const bmr = gender === 'male'
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    return bmr;
  };

  const getDailyCalories = () => {
    if (!userData) return 0;

    const bmr = calculateBMR();
    const activityMultipliers = {
      low: 1.2,
      medium: 1.55,
      high: 1.9
    };

    let tdee = bmr * activityMultipliers[userData.activityLevel];

    // Корректировка на основе цели
    switch (userData.goal) {
      case 'lose':
        return Math.round(tdee - 500); // Дефицит 500 ккал для похудения
      case 'gain':
        return Math.round(tdee + 500); // Профицит 500 ккал для набора массы
      default:
        return Math.round(tdee);
    }
  };

  const getNutrientGoals = () => {
    const dailyCalories = getDailyCalories();
    
    // Распределение макронутриентов:
    // Белки: 30% калорий (4 ккал/г)
    // Углеводы: 50% калорий (4 ккал/г)
    // Жиры: 20% калорий (9 ккал/г)
    return {
      proteins: Math.round((dailyCalories * 0.3) / 4),
      carbs: Math.round((dailyCalories * 0.5) / 4),
      fats: Math.round((dailyCalories * 0.2) / 9)
    };
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, getDailyCalories, getNutrientGoals }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 
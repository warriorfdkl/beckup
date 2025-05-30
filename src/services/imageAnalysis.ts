import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// База данных калорийности продуктов (примерные значения на 100г)
const FOOD_CALORIES: { [key: string]: number } = {
  'apple': 52,
  'banana': 89,
  'orange': 47,
  'broccoli': 34,
  'carrot': 41,
  'potato': 77,
  'rice': 130,
  'pasta': 131,
  'bread': 265,
  'chicken': 165,
  'beef': 250,
  'fish': 206,
  'egg': 155,
  'milk': 42,
  'cheese': 402,
  'yogurt': 59,
  'pizza': 266,
  'hamburger': 295,
  'salad': 33,
  'soup': 85,
  'sandwich': 290,
  'cookie': 488,
  'cake': 257,
  'ice cream': 207,
  'chocolate': 546,
  'nuts': 607,
  'avocado': 160,
  'tomato': 18,
  'cucumber': 15,
  'lettuce': 15,
  'onion': 40,
  'pepper': 20,
  'mushroom': 22,
  'sushi': 150,
};

// Функция для оценки размера порции на основе анализа изображения
function estimatePortionSize(imageElement: HTMLImageElement): 'small' | 'medium' | 'large' {
  const { width, height } = imageElement;
  const area = width * height;
  
  // Простая логика определения размера порции на основе площади объекта
  if (area < 100000) return 'small';
  if (area < 200000) return 'medium';
  return 'large';
}

// Функция для получения коэффициента размера порции
function getPortionMultiplier(size: 'small' | 'medium' | 'large'): number {
  switch (size) {
    case 'small': return 0.7;
    case 'medium': return 1;
    case 'large': return 1.3;
    default: return 1;
  }
}

// Функция для нормализации названия продукта
function normalizeFood(prediction: string): string {
  // Удаляем все, что в скобках
  prediction = prediction.replace(/\(.*?\)/g, '').trim();
  // Берем только первое слово (обычно самое важное)
  prediction = prediction.split(',')[0].trim();
  // Приводим к нижнему регистру
  return prediction.toLowerCase();
}

// Функция для поиска ближайшего совпадения в базе данных
function findClosestMatch(food: string): string | null {
  const foodWords = food.split(' ');
  
  for (const knownFood of Object.keys(FOOD_CALORIES)) {
    for (const word of foodWords) {
      if (knownFood.includes(word) || word.includes(knownFood)) {
        return knownFood;
      }
    }
  }
  
  return null;
}

export interface FoodAnalysis {
  name: string;
  calories: number;
  confidence: number;
  portionSize: 'small' | 'medium' | 'large';
}

export async function analyzeImage(imageData: string): Promise<FoodAnalysis[]> {
  // Загружаем модель MobileNet
  const model = await mobilenet.load();
  
  // Создаем изображение из данных
  const image = new Image();
  image.src = imageData;
  await new Promise(resolve => image.onload = resolve);
  
  // Конвертируем изображение в тензор
  const tfImage = tf.browser.fromPixels(image);
  
  // Получаем предсказания
  const predictions = await model.classify(tfImage);
  
  // Освобождаем память
  tfImage.dispose();
  
  // Обрабатываем результаты
  const results: FoodAnalysis[] = [];
  
  for (const prediction of predictions) {
    const normalizedFood = normalizeFood(prediction.className);
    const matchedFood = findClosestMatch(normalizedFood);
    
    if (matchedFood && FOOD_CALORIES[matchedFood]) {
      const portionSize = estimatePortionSize(image);
      const portionMultiplier = getPortionMultiplier(portionSize);
      
      results.push({
        name: matchedFood,
        calories: Math.round(FOOD_CALORIES[matchedFood] * portionMultiplier),
        confidence: prediction.probability,
        portionSize
      });
    }
  }
  
  return results;
}

// Функция для форматирования результатов анализа
export function formatAnalysisResults(results: FoodAnalysis[]): string {
  if (results.length === 0) {
    return 'Не удалось распознать продукты на фото';
  }

  let message = 'На фото обнаружено:\n';
  let totalCalories = 0;

  results.forEach((item, index) => {
    const confidence = Math.round(item.confidence * 100);
    const portion = item.portionSize === 'medium' ? '' : ` (${item.portionSize} порция)`;
    message += `${index + 1}. ${item.name}${portion}: ${item.calories} ккал (уверенность: ${confidence}%)\n`;
    totalCalories += item.calories;
  });

  message += `\nОбщая калорийность: ${totalCalories} ккал`;
  return message;
} 
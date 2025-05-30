import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramWebApp {
  platform: string;
  showPopup: (params: {
    title: string;
    message: string;
    buttons: Array<{
      id?: string;
      type: "default" | "destructive";
      text: string;
    }>;
  }, callback: (buttonId: string) => void) => void;
  showAlert: (message: string) => void;
  requestCamera?: () => Promise<string>;
  requestMedia?: (params: { type: string; multiple: boolean }) => Promise<string[]>;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

const telegram: TelegramWebApp = typeof window !== 'undefined' ? window.Telegram.WebApp : WebApp as unknown as TelegramWebApp;

export default function CallToAction() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbClick = () => {
    if (telegram.platform !== 'unknown') {
      telegram.showPopup({
        title: 'Фото еды',
        message: 'Как вы хотите добавить фото?',
        buttons: [
          {
            id: "camera",
            type: "default",
            text: "Сделать фото"
          },
          {
            id: "gallery",
            type: "default",
            text: "Выбрать из галереи"
          }
        ]
      }, async (buttonId) => {
        if (buttonId === 'camera' && telegram.requestCamera) {
          const result = await telegram.requestCamera();
          if (result) {
            analyzePhoto(result);
          }
        } else if (buttonId === 'gallery' && telegram.requestMedia) {
          const result = await telegram.requestMedia({
            type: 'photo',
            multiple: false
          });
          if (result && result.length > 0) {
            analyzePhoto(result[0]);
          }
        }
      });
    } else {
      fileInputRef.current?.click();
    }
  };

  const analyzePhoto = async (photoData: string) => {
    setIsAnalyzing(true);
    try {
      // Здесь будет код для анализа фото с использованием TensorFlow.js
      // и определения калорийности еды
      // Пока что просто имитируем задержку
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      telegram.showPopup({
        title: 'Результат анализа',
        message: 'На фото обнаружено:\n- Куриная грудка (200 ккал)\n- Рис (150 ккал)\n- Овощи (50 ккал)',
        buttons: [
          {
            id: "add",
            type: "default",
            text: "Добавить в дневник"
          }
        ]
      }, () => {});
    } catch (error) {
      telegram.showAlert('Произошла ошибка при анализе фото. Попробуйте еще раз.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      className="p-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={handleThumbClick}
        animate={isAnalyzing ? {
          scale: [1, 0.9, 1],
          rotate: [0, 360],
        } : {
          rotate: [-5, 5, -5],
          y: [0, -5, 0]
        }}
        transition={{
          duration: isAnalyzing ? 1 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl mb-4 cursor-pointer"
        disabled={isAnalyzing}
      >
        {isAnalyzing ? '🔄' : '👍'}
      </motion.button>
      
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
        {isAnalyzing ? 'Анализируем фото...' : 'Нажмите 👍, чтобы получить первый отчет'}
      </motion.p>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result && typeof reader.result === 'string') {
                analyzePhoto(reader.result);
              }
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </motion.div>
  );
} 
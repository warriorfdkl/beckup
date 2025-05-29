import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

function Error({ statusCode }: { statusCode?: number }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-teal-400 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          {statusCode ? `Ошибка ${statusCode}` : 'Произошла ошибка'}
        </h1>
        <p className="text-white/90 mb-8">
          {statusCode
            ? 'На сервере произошла ошибка'
            : 'В приложении произошла ошибка'}
        </p>
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

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 
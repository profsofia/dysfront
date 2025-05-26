
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold mt-6 mb-4">Página no encontrada</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link to="/">
            <Button size="lg" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Volver al inicio
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

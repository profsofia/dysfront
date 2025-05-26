
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Gallery from './components/ui/Gallery';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import AreaCalculator from '@/pages/tools/AreaCalculator';
import VolumeCalculator from '@/pages/tools/VolumeCalculator';
import MaterialCalculator from '@/pages/tools/MaterialCalculator';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="herramientas/area" element={<AreaCalculator />} />
          <Route path="herramientas/volumen" element={<VolumeCalculator />} />
          <Route path="herramientas/materiales" element={<MaterialCalculator />} />
           {/* ¡NUEVA RUTA PARA LA GALERÍA! */}
          {/* La galería será accesible en /galeria */}
          <Route path="galeria" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

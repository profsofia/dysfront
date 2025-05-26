// src/components/Gallery.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Si usas el componente Toast de shadcn/ui para mensajes de error, impórtalo
// import { useToast } from "@/components/ui/use-toast"; // Descomenta si lo necesitas

// URL de tu backend
// Asegúrate de que esta URL coincida con la dirección y puerto de tu servidor Node.js
const API_BASE_URL = 'https://dysback.vercel.app/api/images'; 

function Gallery() {
  const [images, setImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null); // Para la paginación de Cloudinary
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Indica si hay más imágenes para cargar
  const [error, setError] = useState(null); // Para manejar errores de la API
  const [selectedImage, setSelectedImage] = useState(null); // Para el modal de imagen grande

  // const { toast } = useToast(); // Descomenta si usas useToast

  // Ref para el observador de intersección (Intersection Observer)
  const observer = useRef();
  // Callback que se adjunta al último elemento de la cuadrícula para detectar el scroll
  const lastImageElementRef = useCallback(node => {
    if (loading) return; // Si ya estamos cargando, no hacer nada
    if (observer.current) observer.current.disconnect(); // Desconecta el observador anterior

    observer.current = new IntersectionObserver(entries => {
      // Si el último elemento es visible y aún hay más imágenes para cargar
      if (entries[0].isIntersecting && hasMore) {
        loadImages(); // Carga más imágenes
      }
    }, {
      threshold: 0.5 // Ejecuta cuando el 50% del elemento es visible
    });

    if (node) observer.current.observe(node); // Observa el nodo actual
  }, [loading, hasMore]); // Dependencias: recargar si cambia loading o hasMore

  // Función para cargar imágenes desde el backend
  const loadImages = useCallback(async () => {
    if (!hasMore || loading) return; // Evita cargas duplicadas o si no hay más
    
    setLoading(true);
    setError(null); // Limpia cualquier error previo

    try {
      // Construye la URL de la API. Añade 'cursor' para la paginación.
      const url = new URL(`${API_BASE_URL}/images`);
      url.searchParams.append('folder', 'dysconstructora'); // Define la carpeta de Cloudinary
      if (nextCursor) {
        url.searchParams.append('cursor', nextCursor);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Aplica transformaciones de Cloudinary en el frontend para las miniaturas
      // Si tu backend ya devuelve URLs transformadas, puedes eliminar este .map()
      const transformedImages = data.images.map(img => ({
        ...img,
        // Ejemplo de transformación: ancho 400, alto 300, recorte de relleno, calidad auto, formato auto
        src: img.src.replace('/upload/', '/upload/w_400,h_300,c_fill,q_auto,f_auto/')
      }));

      setImages(prevImages => [...prevImages, ...transformedImages]);
      setNextCursor(data.next_cursor); // Guarda el cursor para la próxima solicitud
      setHasMore(data.hasMore); // Actualiza si hay más páginas
    } catch (err) {
      console.error("Error al obtener imágenes:", err);
      setError("No se pudieron cargar las imágenes. Intenta de nuevo más tarde.");
      // if (toast) { // Descomenta si usas useToast
      //   toast({
      //     title: "Error al cargar imágenes",
      //     description: "Hubo un problema al obtener las imágenes de la galería.",
      //     variant: "destructive",
      //   });
      // }
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, nextCursor]); // Dependencias para useCallback

  // useEffect para la carga inicial de imágenes
  useEffect(() => {
    loadImages();
  }, [loadImages]); // Se ejecutará una vez al montar el componente

  // Funciones para el modal de imagen grande
  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nuestra Galería de Proyectos</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => {
          // Adjunta la ref al último elemento si aún hay más imágenes
          const isLastImage = images.length === index + 1;
          return (
            <div
              ref={isLastImage && hasMore ? lastImageElementRef : null}
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => openModal(image)}
            >
              <LazyLoadImage
                src={image.src}
                alt={image.alt}
                effect="blur" // Efecto de desenfoque mientras carga
                className="w-full h-48 object-cover object-center"
                wrapperClassName="w-full h-48" // Para que el wrapper tenga dimensiones fijas
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold text-center px-4">{image.alt}</p>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-700">Cargando más imágenes...</p>
          {/* Aquí podrías añadir un spinner de carga más elaborado si quieres */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mt-4"></div>
        </div>
      )}

      {!hasMore && !loading && images.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-500">Has llegado al final de la galería.</p>
        </div>
      )}
      {!hasMore && !loading && images.length === 0 && !error && (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-500">No hay imágenes disponibles en la galería.</p>
        </div>
      )}

      {/* Modal para ver la imagen en grande */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal} // Cierra el modal al hacer clic fuera de la imagen
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
          >
            <button
              className="absolute top-2 right-2 text-gray-800 text-3xl font-bold hover:text-gray-600 focus:outline-none"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              &times;
            </button>
            <LazyLoadImage
              // Para el modal, generalmente quieres la imagen original o una versión más grande.
              // Quitamos las transformaciones de la URL para obtener la versión completa.
              src={selectedImage.src.replace('/w_400,h_300,c_fill,q_auto,f_auto/', '/')}
              alt={selectedImage.alt}
              effect="blur"
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            <p className="text-center text-gray-700 mt-2">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
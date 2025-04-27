import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ImageService from '../services/ImageService';

interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg';
  showUpload?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  size = 'md',
  showUpload = true 
}) => {
  const { user } = useAuth();
  const isAuthorizedUser = user?.email === 'developerjeremylive@gmail.com';
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tamaños predefinidos
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-64 h-64'
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  // useEffect(() => {
  //   if (user?.id) {
  //     loadProfileImage();
  //   }
  // }, [user?.id]);

  const loadProfileImage = async () => {
    try {
      // if (!user?.id) return;
      const imageUrl = await ImageService.getProfileImage('6815e889-a6eb-4368-87b0-7a7ac1af1428');
      setImageUrl(imageUrl);
    } catch (err) {
      console.error('Error al cargar la imagen:', err);
      setError('Error al cargar la imagen de perfil');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const newImageUrl = await ImageService.saveProfileImage(user.id, file);
      setImageUrl(newImageUrl);
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      setError('Error al subir la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      <motion.div 
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden backdrop-blur-sm`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fondo animado */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Contenedor de la imagen */}
        <div className="absolute inset-[2px] bg-black rounded-full overflow-hidden z-10">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <svg className="w-1/2 h-1/2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Efecto de brillo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300" />
      </motion.div>

      {/* Botón de carga - solo visible para usuario autorizado */}
      {showUpload && isAuthorizedUser && (
        <motion.label
          htmlFor="profile-image-upload"
          className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer z-20
                    hover:bg-purple-600 transition-colors duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.label>
      )}

      {/* Indicador de carga */}
      {isLoading && (
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Mensaje de error */}
      {error && (
        <motion.div 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default ProfileImage;
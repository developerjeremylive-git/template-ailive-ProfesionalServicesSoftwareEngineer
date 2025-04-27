import { createClient } from '@supabase/supabase-js';
import { supabase } from '../context/AuthContext';

class ImageService {
  // Función para convertir imagen a cadena de bits
  static async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Eliminar el prefijo de data URL
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Error al convertir imagen a base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  }

  // Función para convertir cadena de bits a imagen
  static base64ToImage(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  // Función para guardar imagen en Supabase
  static async saveProfileImage(userId: string, imageFile: File): Promise<string> {
    try {
      // Obtener el usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      // Verificar si el usuario tiene el correo permitido
      if (user?.email !== 'developerjeremylive@gmail.com') {
        throw new Error('No tienes permiso para subir imágenes de perfil');
      }

      // Convertir imagen a base64
      const base64String = await this.imageToBase64(imageFile);

      // Guardar en la tabla de imágenes de perfil
      const { data, error } = await supabase
        .from('profile_images')
        .upsert({
          user_id: userId,
          image_data: base64String,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Devolver la URL de la imagen codificada
      return this.base64ToImage(base64String);
    } catch (error) {
      console.error('Error al guardar la imagen de perfil:', error);
      throw error;
    }
  }

  // Función para obtener imagen de perfil
  static async getProfileImage(userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('profile_images')
        .select('image_data')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (!data) return null;

      return this.base64ToImage(data.image_data);
    } catch (error) {
      console.error('Error al obtener la imagen de perfil:', error);
      return null;
    }
  }
}

export default ImageService;
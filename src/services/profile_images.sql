CREATE TABLE profile_images (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    image_data TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear política de seguridad RLS (Row Level Security)
ALTER TABLE profile_images ENABLE ROW LEVEL SECURITY;

-- Política para permitir que los usuarios puedan insertar sus propias imágenes
CREATE POLICY "Users can insert their own profile images" ON profile_images
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Política para permitir que los usuarios puedan actualizar sus propias imágenes
CREATE POLICY "Users can update their own profile images" ON profile_images
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Política para permitir que los usuarios puedan eliminar sus propias imágenes
CREATE POLICY "Users can delete their own profile images" ON profile_images
FOR DELETE
USING (auth.uid() = user_id);

-- Política para permitir que cualquier usuario (incluso anónimos) pueda ver las imágenes
CREATE POLICY "Anyone can view profile images" ON profile_images
FOR SELECT
TO PUBLIC
USING (true);
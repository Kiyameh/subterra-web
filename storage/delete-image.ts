'use server'

import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    // Extraer el public_id de la URL de Cloudinary
    const publicId = getPublicIdFromUrl(imageUrl)

    if (!publicId) {
      throw new Error('Invalid Cloudinary URL')
    }

    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result === 'ok') {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
    return false
  }
}

// Función para extraer el public_id de la URL de la imagen
const getPublicIdFromUrl = (url: string): string => {
  const urlParts = url.split('/')
  const imageIdWithExtension = urlParts[urlParts.length - 1]
  const publicId = imageIdWithExtension.split('.')[0]
  return publicId
}

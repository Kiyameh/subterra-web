'use server'

import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'

/**
 * Configuración de Cloudinary
 */
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})
/**
 * @description Interfaz de retorno de la función uploadToCloudinary
 */
export interface UploadResult {
  success: boolean
  url?: string
  publicId?: string
  error?: string
}
/**
 * @description Interfaz de retorno de la función deleteFromCloudinary
 */
export interface DeleteResult {
  success: boolean
  error?: string
}

/**
 * @description Sube una imagen a Cloudinary
 * @param imageData - Imagen en formato base64
 */
export async function uploadToCloudinary(
  imageData: string
): Promise<UploadResult> {
  try {
    // Upload the image to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        imageData,
        {
          folder: 'image-uploads',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as UploadApiResponse)
        }
      )
    })

    // Return the Cloudinary URL and public ID
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return {
      success: false,
      error: 'Failed to upload image to Cloudinary',
    }
  }
}

/**
 * @description Elimina una imagen de Cloudinary
 * @param publicId - ID público de la imagen en Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string
): Promise<DeleteResult> {
  try {
    // Delete the image from Cloudinary
    const result = await new Promise<{result: string}>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })

    if (result.result === 'ok') {
      return {
        success: true,
      }
    } else {
      return {
        success: false,
        error: `Cloudinary responded with: ${result.result}`,
      }
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    return {
      success: false,
      error: 'Failed to delete image from Cloudinary',
    }
  }
}

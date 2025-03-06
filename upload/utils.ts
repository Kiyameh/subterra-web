/**
 * @description Extrae el ID público de una imagen en Cloudinary a partir de su URL
 * @param url - URL de la imagen en Cloudinary
 */

export function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Ejemplo URL: https://res.cloudinary.com/demo/image/upload/v1234567890/image-uploads/abcdef123456.jpg
    const regex = /\/v\d+\/([^/]+\/[^.]+)/
    const match = url.match(regex)

    if (match && match[1]) {
      return match[1]
    }

    return null
  } catch (error) {
    console.error('Error extracting public ID:', error)
    return null
  }
}

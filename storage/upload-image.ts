'use server'

import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get('image') as File | null

  if (!file) {
    throw new Error('No image selected')
  }

  const buffer = await file.arrayBuffer()

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {resource_type: 'image'},
        (error, result: UploadApiResponse | undefined) => {
          if (error) {
            reject(error)
          } else if (result && result.secure_url) {
            resolve(result.secure_url)
          } else {
            reject(new Error('Cloudinary upload failed'))
          }
        }
      )
      .end(Buffer.from(buffer))
  })
}

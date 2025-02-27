// components/FileField.tsx
'use client'

import {Button} from '@/components/ui/button'
import {deleteImage} from '@/storage/delete-image'
import {uploadImage} from '@/storage/upload-image'
import {useState, FormEvent} from 'react'

export default function FileField() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const file = formData.get('image') as File | null

    if (file) {
      setImageName(file.name)
    }

    try {
      const url = await uploadImage(formData)
      setImageUrl(url)
      setError(null)
    } catch (err: unknown) {
      setError((err as Error).message)
      setImageUrl(null)
      setImageName(null)
    }
  }

  const handleDelete = async () => {
    if (imageUrl) {
      const success = await deleteImage(imageUrl)
      if (success) {
        setImageUrl(null)
        setImageName(null)
      } else {
        setError('Failed to delete image')
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          name="image"
          accept="image/*"
        />
        <Button type="submit">Upload</Button>
      </form>

      {error && <p style={{color: 'red'}}>{error}</p>}
      {imageUrl && imageName && (
        <div>
          <span>{imageName}</span>
          <Button
            size="icon"
            onClick={handleDelete}
          >
            Del
          </Button>
        </div>
      )}
    </div>
  )
}

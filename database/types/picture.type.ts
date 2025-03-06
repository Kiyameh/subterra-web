import {z} from 'zod'

export const PictureSchema = z.object({
  author: z.string().optional(),
  date: z.date().optional(),
  description: z.string().optional(),
  file_src: z.string(),
  publicId: z.string().optional(),
})

export type Picture = z.infer<typeof PictureSchema>

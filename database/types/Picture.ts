import {z} from 'zod'
import {
  bigText,
  maxCharMsg,
  mediumText,
} from '@/database/validation/validationDefaults'

export const PictureSchema = z.object({
  author: z.string().max(mediumText, maxCharMsg).optional(),
  //? Obligar a que sea una fecha
  date: z.coerce.date().optional(),
  description: z.string().max(bigText, maxCharMsg).optional(),
  file_src: z.string(),
  publicId: z.string().optional(),
})

export type Picture = z.infer<typeof PictureSchema>

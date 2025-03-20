import {z} from 'zod'
import {
  mediumText,
  maxCharMsg,
  bigText,
} from '@/database/validation/validationDefaults'

export const topographyTypes = [
  'plan',
  'proyected',
  'developed',
  '3D',
  'other',
] as const

export const TopographySchema = z.object({
  author: z.string().max(mediumText, maxCharMsg).optional(),
  groups: z.string().optional(),
  //? Obligar a que sea una fecha
  date: z.coerce.date().optional(),
  description: z.string().max(bigText, maxCharMsg).optional(),
  file_src: z.string(),
  type: z.enum(topographyTypes).optional(),
  publicId: z.string().optional(),
})

export type Topography = z.infer<typeof TopographySchema>

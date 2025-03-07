import {z} from 'zod'

export const TopographySchema = z.object({
  author: z.string().optional(),
  groups: z.string().optional(),
  //? Obligar a que sea una fecha
  date: z.coerce.date().optional(),
  description: z.string().optional(),
  file_src: z.string(),
  type: z.enum(['plan', 'proyected', 'developed', '3D', 'other']).optional(),
  publicId: z.string().optional(),
})

export type Topography = z.infer<typeof TopographySchema>

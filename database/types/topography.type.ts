import {z} from 'zod'

export const TopographySchema = z.object({
  authors: z.string().optional(),
  groups: z.string().optional(),
  date: z.date().optional(),
  description: z.string().optional(),
  file_src: z.string(),
  type: z.enum(['plan', 'proyected', 'developed', '3D', 'other']).optional(),
  publicId: z.string().optional(),
})

export type Topography = z.infer<typeof TopographySchema>

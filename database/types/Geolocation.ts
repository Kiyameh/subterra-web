import {z} from 'zod'
import {maxCharMsg, mediumText} from '@/database/validation/validationDefaults'

export const GeolocationSchema = z.object({
  date: z.coerce.date(),
  author: z.string().max(mediumText, maxCharMsg).optional(),
})

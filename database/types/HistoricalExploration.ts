import {z} from 'zod'
import {
  bigText,
  maxCharMsg,
  mediumText,
} from '@/database/validation/validationDefaults'

export const HistoricalExplorationSchema = z.object({
  date: z.coerce.date(),
  author: z.string().max(mediumText, maxCharMsg).optional(),
  publication: z.string().max(bigText, maxCharMsg).optional(),
  description: z.string().max(bigText, maxCharMsg).optional(),
})

import {z} from 'zod'
import {PictureSchema} from './Picture.type'
import {Document, Types} from 'mongoose'
import {
  OIDRegex,
  OIDMsg,
  maxCharMsg,
  mediumText,
  hugeText,
} from '../validation/validationDefaults'

export const ExplorationSchema = z.object({
  // Manejo de relaciones
  datatype: z.literal('exploration').default('exploration'),
  instances: z.array(z.string().regex(OIDRegex, OIDMsg)),
  caves: z.array(z.string().regex(OIDRegex, OIDMsg)).optional(),
  groups: z.array(z.string().regex(OIDRegex, OIDMsg)).optional(),

  // Datos troncales
  name: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(mediumText, maxCharMsg),
  dates: z.array(z.coerce.date()).optional(),
  cave_time: z.coerce
    .number()
    .nonnegative({
      message: 'Número positivo',
    })
    .optional(),
  participants: z.array(z.string().max(mediumText, maxCharMsg)).optional(),
  collaborators: z.array(z.string().max(mediumText, maxCharMsg)).optional(),

  // Descripciones
  description: z.string().max(hugeText, maxCharMsg).optional(),
  incidents: z.string().max(hugeText, maxCharMsg).optional(),
  inventory: z.string().max(hugeText, maxCharMsg).optional(),
  pending_work: z.string().max(hugeText, maxCharMsg).optional(),

  // Adjuntos
  pictures: z.array(PictureSchema).optional(),
})

export type ExplorationODT = z.infer<typeof ExplorationSchema>

type ExplorationDocumentBase = Omit<
  ExplorationODT,
  '_id' | '__v' | 'createdAt' | 'updatedAt' | 'instances' | 'caves' | 'groups'
>

export type ExplorationFormValues = Omit<
  ExplorationODT,
  '_id' | '__v' | 'createdAt' | 'updatedAt'
>

export interface ExplorationDocument extends ExplorationDocumentBase, Document {
  instances: Types.ObjectId[]
  caves: Types.ObjectId[]
  groups: Types.ObjectId[]
}

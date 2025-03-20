import {z} from 'zod'
import {Document, Types} from 'mongoose'
import {InstallationSchema} from '@/database/types/Installation'
import {PictureSchema} from '@/database/types/Picture'
import {TopographySchema} from '@/database/types/Topography'
import {HistoricalExplorationSchema} from '@/database/types/HistoricalExploration'
import {
  OIDRegex,
  OIDMsg,
  maxCharMsg,
  smallText,
  tinyText,
  bigText,
  hugeText,
  maxLenght,
  maxDepth,
  mediumText,
} from '@/database/validation/validationDefaults'

export const SystemSchema = z.object({
  // MongoDB
  _id: z.string().regex(OIDRegex, OIDMsg).optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  // Manejo de relaciones
  datatype: z.literal('system').default('system'),
  instances: z.array(z.string().regex(OIDRegex, OIDMsg)),

  // Datos troncales
  name: z.string().max(smallText, maxCharMsg),
  catalog: z.string().max(tinyText, maxCharMsg).optional(),
  initials: z.array(z.string().max(tinyText, maxCharMsg)).optional(),
  alt_names: z.array(z.string().max(smallText, maxCharMsg)).optional(),

  // Descripciones
  description: z.string().max(hugeText, maxCharMsg).optional(),
  regulations: z.boolean().optional(),
  regulation_description: z.string().max(bigText, maxCharMsg).optional(),
  length: z.coerce
    .number()
    .nonnegative({
      message: 'Número positivo',
    })
    .max(maxLenght, {
      message: '¡Enhorabuena!Has encontrado la cueva más larga del mundo',
    })
    .optional(),
  depth: z.coerce
    .number()
    .nonnegative({
      message: 'Número positivo',
    })
    .max(maxDepth, {
      message: '¡Enhorabuena! Has encontrado la cueva más profunda del mundo',
    })
    .optional(),

  massif: z.string().max(mediumText, maxCharMsg).optional(),

  // Datos exploración
  historical_explorations: z.array(HistoricalExplorationSchema).optional(),

  // Datos científicos
  geolog_age: z.string().max(bigText, maxCharMsg).optional(),
  geolog_litology: z.string().max(bigText, maxCharMsg).optional(),
  arqueolog: z.string().max(bigText, maxCharMsg).optional(),
  paleontolog: z.string().max(bigText, maxCharMsg).optional(),
  mineralog: z.string().max(bigText, maxCharMsg).optional(),
  contamination: z.string().max(bigText, maxCharMsg).optional(),
  biolog: z.string().max(bigText, maxCharMsg).optional(),
  hidrolog_system: z.string().max(bigText, maxCharMsg).optional(),
  hidrolog_subsystem: z.string().max(bigText, maxCharMsg).optional(),

  // Adjuntos
  pictures: z.array(PictureSchema).optional(),
  topographies: z.array(TopographySchema).optional(),
  installations: z.array(InstallationSchema).optional(),
})

export type SystemODT = z.infer<typeof SystemSchema>

type SystemDocumentBase = Omit<
  SystemODT,
  '_id' | '__v' | 'createdAt' | 'updatedAt' | 'instances'
>

export type SystemFormValues = Omit<
  SystemODT,
  '_id' | '__v' | 'createdAt' | 'updatedAt'
>

export interface SystemDocument extends SystemDocumentBase, Document {
  instances: Types.ObjectId[]
}

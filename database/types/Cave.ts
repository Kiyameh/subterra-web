import {z} from 'zod'
import {Document, Types} from 'mongoose'
import {InstallationSchema} from '@/database/types/Installation'
import {PictureSchema} from '@/database/types/Picture'
import {TopographySchema} from '@/database/types/Topography'
import {UtmCoordinateSchema} from '@/database/types/UtmCoordinate'
import {GeolocationSchema} from '@/database/types/Geolocation'
import {HistoricalExplorationSchema} from '@/database/types/HistoricalExploration'
import {
  bigText,
  hugeText,
  maxCharMsg,
  maxDepth,
  maxLenght,
  mediumText,
  OIDMsg,
  OIDRegex,
  smallText,
  tinyText,
} from '@/database/validation/validationDefaults'

export const caveShapes = [
  'Abrigo',
  'Cueva',
  'Diaclasa',
  'Dolina',
  'Grieta',
  'Manantial',
  'Mina',
  'Sima',
  'Sumidero',
] as const

export type CaveShape = (typeof caveShapes)[number]

export const CaveSchema = z.object({
  // MongoDB
  _id: z.string().regex(OIDRegex, OIDMsg).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  __v: z.number().optional(),
  versions: z.array(
    z
      .object({
        __v: z.number(), // Validación obligatoria de la propiedad __v
        updatedAt: z.coerce.date(), // Validación obligatoria
      })
      .catchall(z.any()) // Permitir otras propiedades no definidas
  ),
  // Manejo de relaciones
  datatype: z.literal('cave').default('cave'),
  instances: z.array(z.string().regex(OIDRegex, OIDMsg)),
  system: z.string().regex(OIDRegex, OIDMsg).optional().nullable(),

  // Datos generales
  name: z.string().max(smallText, maxCharMsg).optional(),
  catalog: z.string().max(tinyText, maxCharMsg).optional(),
  initials: z.array(z.string().max(tinyText, maxCharMsg)).optional(),
  alt_names: z.array(z.string().max(smallText, maxCharMsg)).optional(),

  // Datos descriptivos
  cave_shapes: z.array(z.enum(caveShapes)).optional(),
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

  // Datos localización
  coordinates: UtmCoordinateSchema,
  municipality: z.string().max(mediumText, maxCharMsg).optional(),
  locality: z.string().max(mediumText, maxCharMsg).optional(),
  toponymy: z.array(z.string().max(mediumText, maxCharMsg)).optional(),
  massif: z.string().max(mediumText, maxCharMsg).optional(),
  location_description: z.string().max(bigText, maxCharMsg).optional(),
  geolocations: z.array(GeolocationSchema).optional(),

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

export type CaveODT = z.infer<typeof CaveSchema>

export type CaveFormValues = Omit<CaveODT, '_id'>

type CaveDocumentBase = Omit<
  CaveODT,
  '_id' | '__v' | 'createdAt' | 'updatedAt' | 'instances' | 'system'
>

export interface CaveDocument extends CaveDocumentBase, Document {
  instances: Types.ObjectId[]
  system?: Types.ObjectId
}

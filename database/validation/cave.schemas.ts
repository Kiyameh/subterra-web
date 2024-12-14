import {z} from 'zod'
import {caveShapes, coordProyections} from '../models/Cave.enums'

// Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
const hex24Regex = /^[0-9a-fA-F]{24}$/

export const CaveFormSchema = z.object({
  //* Manejo DB:
  instances: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ), // Instancias
  system: z
    .string()
    .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
    .optional(), // ObjectId del sistema
  datatype: z.string().default('cave'),
  explorations: z
    .array(
      z
        .string()
        .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
    )
    .optional(), // Exploraciones

  //* Datos troncales:
  catalog: z.string().max(10, {message: 'Máximo 10 caracteres'}).optional(),
  initials: z
    .array(z.string().max(10, {message: 'Máximo 10 caracteres'}))
    .optional(),
  name: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(40, {message: 'Máximo 40 caracteres'}),
  alt_names: z
    .array(z.string().max(40, {message: 'Máximo 40 caracteres'}))
    .optional(),
  //* Descripciones:
  cave_shapes: z.array(z.enum(caveShapes)).optional(),
  description: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  regulations: z.boolean().optional(),
  regulation_description: z
    .string()
    .max(1000, {message: 'Demasiado largo'})
    .optional(),

  length: z
    .number()
    .positive({message: 'Número positivo'})
    .max(400000, {
      message: '¡Enhorabuena!Has encontrado la cueva más larga del mundo',
    })
    .optional(),
  depth: z
    .number()
    .positive({
      message: 'Introduce la profundidad de forma absoluta (número positivo)',
    })
    .max(2500, {
      message: '¡Enhorabuena!Has encontrado la cueva más profunda del mundo',
    })
    .optional(),
  main_image: z.string().optional(),

  coordinates: z.object({
    x_coord: z
      .number()
      .min(1, {message: 'Coordenada requerida'})
      .max(999999, {message: 'Coordenada inválida'}),
    y_coord: z
      .number()
      .min(1, {message: 'Coordenada requerida'})
      .max(9999999, {message: 'Coordenada inválida'}),
    z_coord: z
      .number()
      .positive({message: 'Número positivo'})
      .max(8849, {message: 'No hay cuevas voladoras'})
      .optional(),
    coord_proyec: z.enum(coordProyections).default('WGS84'),
    utm_zone: z
      .number()
      .positive({message: 'Número positivo'})
      .min(1, {message: 'Zona requerida'})
      .max(60, {message: 'Zona inválida'}),
    hemisphere: z.enum(['N', 'S']).default('N'),
  }),

  municipality: z.string().max(40, {message: 'Demasiado largo'}).optional(),
  locality: z.string().max(40, {message: 'Demasiado largo'}).optional(),
  toponymy: z
    .array(z.string().max(40, {message: 'Demasiado largo'}))
    .optional(),
  massif: z.string().max(40, {message: 'Demasiado largo'}).optional(),
  location_description: z
    .string()
    .max(1000, {message: 'Demasiado largo'})
    .optional(),
  geolog_age: z.string().max(40, {message: 'Demasiado largo'}).optional(),
  geolog_litology: z.string().max(40, {message: 'Demasiado largo'}).optional(),
  arqueolog: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  paleontolog: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  mineralog: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  contamination: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  biolog: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  hidrolog_system: z.string().max(40, {message: 'Demasiado largo'}).optional(),
  hidrolog_subsystem: z
    .string()
    .max(40, {message: 'Demasiado largo'})
    .optional(),
})

export type CaveFormValues = z.infer<typeof CaveFormSchema>

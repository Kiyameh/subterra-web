import {z} from 'zod'
import {caveShapes, coordProyections, utmZones} from '../models/Cave.enums'

/**
 * @const Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
 */
const hex24Regex = /^[0-9a-fA-F]{24}$/

/**
 * @const Máximos de caracteres permitidos en los campos de una cueva
 */

export const caveMaxCharacters = {
  name: 40,
  catalog: 10,
  initials: 10,
  alt_names: 40,

  description: 5000,
  regulation_description: 1000,
  length: 400000,
  depth: 2500,

  x_coord: 999999,
  y_coord: 9999999,
  z_coord: 8849,
  municipality: 40,
  locality: 40,
  toponymy: 40,
  massif: 40,
  location_description: 1000,

  geolog_age: 40,
  geolog_litology: 40,
  arqueolog: 1000,
  paleontolog: 1000,
  mineralog: 1000,
  contamination: 1000,
  biolog: 1000,
  hidrolog_system: 40,
  hidrolog_subsystem: 40,
}

/**
 * @schema de Zod para validar formulario de cueva
 */

export const CaveFormSchema = z.object({
  //* Manejo de relaciones:
  datatype: z.string().default('cave'),
  instances: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ),
  system: z
    .string()
    .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
    .optional()
    .nullable(),

  //* Datos troncales:
  catalog: z
    .string()
    .max(caveMaxCharacters.catalog, {message: 'Demasiado largo'})
    .optional(),
  initials: z
    .array(
      z.string().max(caveMaxCharacters.initials, {message: 'Demasiado largo'})
    )
    .optional(),
  name: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(caveMaxCharacters.name, {message: 'Demasiado largo'}),
  alt_names: z
    .array(
      z.string().max(caveMaxCharacters.alt_names, {message: 'Demasiado largo'})
    )
    .optional(),

  //* Datos descriptivos:
  cave_shapes: z.array(z.enum(caveShapes)).optional(),
  description: z
    .string()
    .max(caveMaxCharacters.description, {message: 'Demasiado largo'})
    .optional(),
  regulations: z.boolean().optional(),
  regulation_description: z
    .string()
    .max(caveMaxCharacters.regulation_description, {message: 'Demasiado largo'})
    .optional(),
  //? Propiedad coerce para obligar a que el valor sea un número
  length: z.coerce
    .number()
    .min(0, {message: 'Número positivo'})
    .max(caveMaxCharacters.length, {
      message: '¡Enhorabuena!Has encontrado la cueva más larga del mundo',
    })
    .optional(),
  depth: z.coerce
    .number()
    .min(0, {
      message: 'Introduce la longitud de forma absoluta (número positivo)',
    })
    .max(caveMaxCharacters.depth, {
      message: '¡Enhorabuena! Has encontrado la cueva más profunda del mundo',
    })
    .optional(),
  main_image: z.string().optional(),

  //* Datos localización:
  coordinates: z.object({
    //? Propiedad coerce para obligar a que el valor sea un número
    x_coord: z.coerce
      .number()
      .min(1, {message: 'Coordenada requerida'})
      .max(caveMaxCharacters.x_coord, {message: 'Coordenada inválida'}),
    y_coord: z.coerce
      .number()
      .min(1, {message: 'Coordenada requerida'})
      .max(caveMaxCharacters.y_coord, {message: 'Coordenada inválida'}),
    z_coord: z.coerce
      .number()
      .min(0, {message: 'Coordenada inválida'})
      .max(caveMaxCharacters.z_coord, {message: 'No hay cuevas voladoras'})
      .optional(),
    coord_proyec: z.enum(coordProyections).default('WGS84'),
    utm_zone: z.enum(utmZones).default('30'),
    hemisphere: z.enum(['N', 'S']).default('N'),
  }),

  municipality: z
    .string()
    .max(caveMaxCharacters.municipality, {message: 'Demasiado largo'})
    .optional(),
  locality: z
    .string()
    .max(caveMaxCharacters.description, {message: 'Demasiado largo'})
    .optional(),
  toponymy: z
    .array(
      z.string().max(caveMaxCharacters.toponymy, {message: 'Demasiado largo'})
    )
    .optional(),
  massif: z
    .string()
    .max(caveMaxCharacters.massif, {message: 'Demasiado largo'})
    .optional(),
  location_description: z
    .string()
    .max(1000, {message: 'Demasiado largo'})
    .optional(),

  //* Datos científicos:
  geolog_age: z
    .string()
    .max(caveMaxCharacters.geolog_age, {message: 'Demasiado largo'})
    .optional(),
  geolog_litology: z
    .string()
    .max(caveMaxCharacters.geolog_litology, {message: 'Demasiado largo'})
    .optional(),
  arqueolog: z
    .string()
    .max(caveMaxCharacters.arqueolog, {message: 'Demasiado largo'})
    .optional(),
  paleontolog: z
    .string()
    .max(caveMaxCharacters.paleontolog, {message: 'Demasiado largo'})
    .optional(),
  mineralog: z
    .string()
    .max(caveMaxCharacters.mineralog, {message: 'Demasiado largo'})
    .optional(),
  contamination: z
    .string()
    .max(caveMaxCharacters.contamination, {message: 'Demasiado largo'})
    .optional(),
  biolog: z
    .string()
    .max(caveMaxCharacters.biolog, {message: 'Demasiado largo'})
    .optional(),
  hidrolog_system: z
    .string()
    .max(caveMaxCharacters.hidrolog_system, {message: 'Demasiado largo'})
    .optional(),
  hidrolog_subsystem: z
    .string()
    .max(caveMaxCharacters.hidrolog_subsystem, {message: 'Demasiado largo'})
    .optional(),
})

/**
 * @type Tipo de los datos introducidos en el formulario de creación de cueva.
 */

export type CaveFormValues = z.infer<typeof CaveFormSchema>

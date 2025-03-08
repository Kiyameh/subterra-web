import {z} from 'zod'
import {PictureSchema} from '@/database/types/picture.type'
import {TopographySchema} from '@/database/types/topography.type'
import {InstallationSchema} from '@/database/types/installation.type'

/**
 * @const Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
 */
const hex24Regex = /^[0-9a-fA-F]{24}$/

/**
 * @const Máximos de caracteres permitidos en los campos de un sistema
 */

export const systemMaxCharacters = {
  catalog: 10,
  initials: 10,
  name: 40,
  alt_names: 40,

  description: 1000,
  regulation_description: 1000,
  exploration_description: 1000,
  length: 400000,
  depth: 2500,
  massif: 120,

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
 * @schema de Zod para validar formulario de creación de sistema
 */

export const SystemFormSchema = z.object({
  //* Manejo DB:
  datatype: z.string().default('system'),
  instances: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ),

  //* Datos troncales:
  catalog: z
    .string()
    .max(systemMaxCharacters.catalog, {message: 'Máximo 10 caracteres'})
    .optional(),
  initials: z
    .array(
      z
        .string()
        .max(systemMaxCharacters.initials, {message: 'Máximo 10 caracteres'})
    )
    .optional(),
  name: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(systemMaxCharacters.name, {message: 'Máximo 40 caracteres'}),
  alt_names: z
    .array(
      z
        .string()
        .max(systemMaxCharacters.alt_names, {message: 'Máximo 40 caracteres'})
    )
    .optional(),

  //* Datos descriptivos:
  description: z
    .string()
    .max(systemMaxCharacters.description, {message: 'Demasiado largo'})
    .optional(),
  regulations: z.boolean().optional(),
  regulation_description: z
    .string()
    .max(systemMaxCharacters.regulation_description, {
      message: 'Demasiado largo',
    })
    .optional(),

  exploration_description: z
    .string()
    .max(systemMaxCharacters.exploration_description, {
      message: 'Demasiado largo',
    })
    .optional(),
  //? Propiedad coerce para obligar a que el valor sea un número
  length: z.coerce
    .number()
    .min(0, {message: 'Número positivo'})
    .max(systemMaxCharacters.length, {
      message: '¡Enhorabuena!Has encontrado el sistema más largo del mundo',
    })
    .optional(),
  depth: z.coerce
    .number()
    .min(0, {
      message: 'Introduce la longitud de forma absoluta (número positivo)',
    })
    .max(systemMaxCharacters.depth, {
      message: '¡Enhorabuena! Has encontrado el sistema más profundo del mundo',
    })
    .optional(),
  massif: z
    .string()
    .max(systemMaxCharacters.massif, {message: 'Máximo 120 caracteres'})
    .optional(),

  //* Datos científicos:
  geolog_age: z
    .string()
    .max(systemMaxCharacters.geolog_age, {message: 'Demasiado largo'})
    .optional(),
  geolog_litology: z
    .string()
    .max(systemMaxCharacters.geolog_litology, {message: 'Demasiado largo'})
    .optional(),
  arqueolog: z
    .string()
    .max(systemMaxCharacters.arqueolog, {message: 'Demasiado largo'})
    .optional(),
  paleontolog: z
    .string()
    .max(systemMaxCharacters.paleontolog, {message: 'Demasiado largo'})
    .optional(),
  mineralog: z
    .string()
    .max(systemMaxCharacters.mineralog, {message: 'Demasiado largo'})
    .optional(),
  contamination: z
    .string()
    .max(systemMaxCharacters.contamination, {message: 'Demasiado largo'})
    .optional(),
  biolog: z
    .string()
    .max(systemMaxCharacters.biolog, {message: 'Demasiado largo'})
    .optional(),
  hidrolog_system: z
    .string()
    .max(systemMaxCharacters.hidrolog_system, {message: 'Demasiado largo'})
    .optional(),
  hidrolog_subsystem: z
    .string()
    .max(systemMaxCharacters.hidrolog_subsystem, {message: 'Demasiado largo'})
    .optional(),

  //* Datos adjuntos:
  topographies: z.array(TopographySchema).optional(),
  pictures: z.array(PictureSchema).optional(),
  installations: z.array(InstallationSchema).optional(),
})

/**
 * @type Tipo de datos inferidos del esquema de formulario de sistema
 */

export type SystemFormValues = z.infer<typeof SystemFormSchema>

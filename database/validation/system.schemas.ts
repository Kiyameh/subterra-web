import {z} from 'zod'

// Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
const hex24Regex = /^[0-9a-fA-F]{24}$/

export const SystemFormSchema = z.object({
  //* Manejo DB:
  instances: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ), // Instancias
  caves: z
    .array(
      z
        .string()
        .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
    )
    .optional(), // Caves
  datatype: z.string().default('system'),

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

  //* Descripciónes:
  description: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  regulations: z.boolean().optional(),
  regulation_description: z
    .string()
    .max(1000, {message: 'Demasiado largo'})
    .optional(),

  exploration_description: z

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
  massif: z.string().max(120, {message: 'Máximo 120 caracteres'}).optional(),

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

export type SystemFormValues = z.infer<typeof SystemFormSchema>

import {z} from 'zod'

// Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
const hex24Regex = /^[0-9a-fA-F]{24}$/

export const ExplorationFormSchema = z.object({
  // Manejo DB:
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
  groups: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ), // Grupos
  datatype: z.string().default('system'),

  //* Datos troncales:
  name: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(120, {message: 'Máximo 120 caracteres'}),
  dates: z.array(z.date()).optional(),
  //? Propiedad coerce para obligar a que el valor sea un número
  cave_time: z.coerce.number().nonnegative().optional(),
  participants: z
    .array(z.string().max(120, {message: 'Máximo 120 caracteres'}))
    .optional(),
  collaborators: z
    .array(z.string().max(120, {message: 'Máximo 120 caracteres'}))
    .optional(),

  //* Descripciones:
  description: z
    .string()
    .min(3, {message: 'Descripción requerida'})
    .max(1000, {message: 'Demasiado largo'})
    .optional(),
  incidents: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  inventory: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
  pending_work: z.string().max(1000, {message: 'Demasiado largo'}).optional(),
})

export type ExplorationFormValues = z.infer<typeof ExplorationFormSchema>

import {z} from 'zod'

/**
 * @const Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
 */
const hex24Regex = /^[0-9a-fA-F]{24}$/

/**
 * @const Máximos de caracteres permitidos en los campos de un informe de exploración
 */

export const explorationMaxCharacters = {
  name: 120,
  participants: 120,
  collaborators: 120,
  description: 1000,
  incidents: 1000,
  inventory: 1000,
  pending_work: 1000,
}

/**
 * @schema de Zod para validar formulario de informe de exploración
 */

export const ExplorationFormSchema = z.object({
  // Manejo DB:
  instances: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ),
  caves: z
    .array(
      z
        .string()
        .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
    )
    .optional(),
  groups: z.array(
    z
      .string()
      .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
  ),
  datatype: z.string().default('system'),

  //* Datos troncales:
  name: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(explorationMaxCharacters.name, {message: 'Máximo 120 caracteres'}),
  dates: z.array(z.date()).optional(),
  //? Propiedad coerce para obligar a que el valor sea un número
  cave_time: z.coerce.number().nonnegative().optional(),
  participants: z
    .array(
      z.string().max(explorationMaxCharacters.participants, {
        message: 'Máximo 120 caracteres',
      })
    )
    .optional(),
  collaborators: z
    .array(
      z.string().max(explorationMaxCharacters.collaborators, {
        message: 'Máximo 120 caracteres',
      })
    )
    .optional(),

  //* Descripciones:
  description: z
    .string()
    .min(3, {message: 'Descripción requerida'})
    .max(explorationMaxCharacters.description, {
      message: 'Máximo 1000 caracteres',
    })
    .optional(),
  incidents: z
    .string()
    .max(explorationMaxCharacters.incidents, {message: 'Demasiado largo'})
    .optional(),
  inventory: z
    .string()
    .max(explorationMaxCharacters.inventory, {message: 'Demasiado largo'})
    .optional(),
  pending_work: z
    .string()
    .max(explorationMaxCharacters.pending_work, {message: 'Demasiado largo'})
    .optional(),
})

/**
 * @type Tipo de los datos introducidos en el formulario de informe de exploración.
 */
export type ExplorationFormValues = z.infer<typeof ExplorationFormSchema>

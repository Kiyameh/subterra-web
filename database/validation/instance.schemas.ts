import {z} from 'zod'

/**
 * @const Expresión regular para un string hexadecimal de 24 caracteres (ObjectId)
 */
const hex24Regex = /^[0-9a-fA-F]{24}$/

/**
 * @const Máximos de caracteres permitidos en los campos de una instancia
 */
export const instanceMaxCharacters = {
  name: 12,
  fullname: 50,
  acronym: 10,
  description: 1000,
  territory: 50,
}

/**
 * @schema de Zod para validar formulario de creación de instancia
 */
export const InstanceFormSchema = z.object({
  // Relaciones:
  owner: z
    .string()
    .min(1, {message: 'Requerido'})
    .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'}),

  coordinator: z
    .string()
    .min(1, {message: 'Requerido'})
    .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'}),

  master_instance: z
    .string()
    .refine((val) => hex24Regex.test(val), {message: 'OID incorrecto'})
    .optional(),

  // Datos generales:
  name: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(instanceMaxCharacters.name, {message: 'Demasiado largo'}),
  fullname: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(instanceMaxCharacters.fullname, {message: 'Demasiado largo'}),
  acronym: z
    .string()
    .max(instanceMaxCharacters.acronym, {message: 'Demasiado largo'}),
  description: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(instanceMaxCharacters.description, {message: 'Demasiado largo'}),
  territory: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(instanceMaxCharacters.territory, {message: 'Demasiado largo'}),
  public_visibility: z.boolean().default(true),
  public_edition: z.boolean().default(false),
  main_image: z.string().optional(),
  map_image: z.string().optional(),
})

/**
 * @type Tipo de los datos introducidos en el formulario de creación de instancia.
 */

export type InstanceFormValues = z.infer<typeof InstanceFormSchema>

/**
 * @schema de Zod para validar formulario de actualización de instancia
 */

export const UpdateInstanceFormSchema = InstanceFormSchema.omit({
  name: true,
  owner: true,
  coordinator: true,
  master_instance: true,
})

/**
 * @type Tipo de los datos introducidos en el formulario de actualización de instancia.
 */
export type UpdateInstanceFormValues = z.infer<typeof UpdateInstanceFormSchema>

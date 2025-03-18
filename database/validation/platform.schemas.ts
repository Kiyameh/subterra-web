import {z} from 'zod'
import {contactSubjects} from '@/database/models/Platform.model'

/**
 * @const Máximos de caracteres permitidos en los campos de un contacto
 */

export const contactMaxCharacters = {
  user: 24,
  email: 99,
  message: 1000,
}

/**
 * @schema de Zod para validar formulario de contacto
 */

export const contactFormSchema = z.object({
  user: z
    .string()
    .max(contactMaxCharacters.user, {message: 'Demasiado largo'})
    .optional(),
  email: z
    .string()
    .email({message: 'Email requerido'})
    .max(contactMaxCharacters.email, {message: 'Demasiado largo'}),
  subject: z.enum(contactSubjects),
  message: z
    .string()
    .min(3, {message: 'Mensaje requerido'})
    .max(contactMaxCharacters.message, {message: 'Demasiado largo'}),
})

/**
 * @type Tipo de los datos introducidos en el formulario de contacto.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * @const Máximos de caracteres permitidos en los campos de una solicitud de instancia
 */

export const instanceRequestMaxCharacters = {
  fullname: 50,
  description: 1000,
  territory: 300,
  message: 1000,
  master_instance: 24,
}

/**
 * @schema de Zod para validar formulario de solicitud de instancia
 */

export const instanceRequestFormSchema = z.object({
  user: z.string(),
  group: z.string(),
  fullname: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(instanceRequestMaxCharacters.fullname, {message: 'Demasiado largo'}),
  description: z
    .string()
    .min(3, {message: 'Descripción requerida'})
    .max(instanceRequestMaxCharacters.description, {
      message: 'Demasiado largo',
    }),
  territory: z
    .string()
    .min(3, {message: 'Información territorial requerida'})
    .max(instanceRequestMaxCharacters.territory, {message: 'Demasiado largo'}),
  public_visibility: z.boolean(),
  public_edition: z.boolean(),
  message: z
    .string()
    .max(instanceRequestMaxCharacters.message, {message: 'Demasiado largo'}),
  master_instance: z.string().optional(),
})

/**
 * @type Tipo de los datos introducidos en el formulario de solicitud de instancia.
 */
export type InstanceRequestFormValues = z.infer<
  typeof instanceRequestFormSchema
>

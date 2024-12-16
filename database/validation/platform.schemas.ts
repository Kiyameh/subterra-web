import {z} from 'zod'
import {contactSubjects} from '@/database/models/Platform.enums'

/**
 * @const Máximos de caracteres permitidos en los campos de un contacto
 */

export const contactMaxCharacters = {
  user: 20,
  email: 20,
  message: 1000,
}

/**
 * @schema de Zod para validar formulario de contacto
 */

export const contactFormSchema = z.object({
  user: z.string().max(contactMaxCharacters.user, {message: 'Demasiado largo'}),
  email: z
    .string()
    .email()
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
  roles: 300,
  message: 1000,
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
  roles: z
    .string()
    .min(3, {message: 'Roles requeridos'})
    .max(instanceRequestMaxCharacters.roles, {message: 'Demasiado largo'}),
  message: z
    .string()
    .max(instanceRequestMaxCharacters.message, {message: 'Demasiado largo'}),
})

/**
 * @type Tipo de los datos introducidos en el formulario de solicitud de instancia.
 */
export type InstanceRequestFormValues = z.infer<
  typeof instanceRequestFormSchema
>

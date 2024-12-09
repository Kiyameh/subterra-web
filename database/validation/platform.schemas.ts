import {z} from 'zod'
import {contactSubjects} from '@/database/models/Platform.enums'

/**
 * @schema de Zod para validar formulario de contacto
 */
export const contactFormSchema = z.object({
  user: z.string(),
  email: z.string().email(),
  subject: z.enum(contactSubjects),
  message: z
    .string()
    .min(3, {message: 'Mensaje requerid'})
    .max(1000, {message: 'Demasiado largo'}),
})

/**
 * @type Tipo de los datos introducidos en el formulario de contacto.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * @schema de Zod para validar formulario de solicitud de instancia
 */

export const instanceRequestFormSchema = z.object({
  user: z.string(),
  group: z.string(),
  fullname: z
    .string()
    .min(3, {message: 'Nombre requerido'})
    .max(50, {message: 'Demasiado largo'}),
  description: z
    .string()
    .min(3, {message: 'Descripción requerida'})
    .max(1000, {message: 'Demasiado largo'}),
  territory: z
    .string()
    .min(3, {message: 'Información territorial requerida'})
    .max(300, {message: 'Demasiado largo'}),
  roles: z
    .string()
    .min(3, {message: 'Roles requeridos'})
    .max(300, {message: 'Demasiado largo'}),
  message: z.string().max(1000, {message: 'Demasiado largo'}),
})

/**
 * @type Tipo de los datos introducidos en el formulario de solicitud de instancia.
 */
export type InstanceRequestFormValues = z.infer<
  typeof instanceRequestFormSchema
>

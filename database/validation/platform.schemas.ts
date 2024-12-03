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

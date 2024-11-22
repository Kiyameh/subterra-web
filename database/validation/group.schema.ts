import {z} from 'zod'
import {countries, groupCategories, provinces_ES} from '../models/Group.enums'

export const GroupFormSchema = z.object({
  // Datos generales:
  name: z
    .string()
    .min(3, {message: 'Mínimo 3 caracteres'})
    .max(16, {message: 'Máximo 16 caracteres'})
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Solo puede contener letras, números y guiones bajos',
    }),
  fullname: z
    .string()
    .min(3, {message: 'Mínimo 3 caracteres'})
    .max(40, {message: 'Máximo 40 caracteres'}),
  acronym: z.string().max(6, {message: 'Máximo 6 caracteres'}).optional(),
  description: z.string().max(250, {message: 'Demasiado largo'}).optional(),
  group_categories: z.array(z.enum(groupCategories)).optional(),
  main_image: z.string().optional(),
  logo_image: z.string().optional(),

  // Datos de contacto:
  street: z.string().optional(),
  portal_number: z.string().optional(),
  floor: z.string().optional(),
  door: z.string().optional(),
  postal_code: z.number().max(6, {message: 'Demasiado largo'}).optional(),
  city: z.string().optional(),
  province: z.enum(provinces_ES).optional(),
  country: z.enum(countries).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  webpage: z.string().optional(),
})

export type GroupFormValues = z.infer<typeof GroupFormSchema>

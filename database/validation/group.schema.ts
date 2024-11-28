import {z} from 'zod'
import {groupCategories} from '../models/Group.enums'
import countries from '@/database/data/countries.json'
import states from '@/database/data/states.json'

const countryNames = countries.map((country) => country.name)
const stateNames = states.map((state) => state.name)

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
  //? Propiedad coerce para obligar a que el valor sea un número
  postal_code: z.coerce
    .number({message: 'Introduce un número'})
    .max(99999, {message: 'Demasiado largo'})
    .optional(),
  city: z.string().optional(),
  province: z.string().refine((name) => stateNames.includes(name), {
    message: 'El nombre de la provincia no es válido',
  }),
  country: z.string().refine((name) => countryNames.includes(name), {
    message: 'El nombre del país no es válido',
  }),
  phone: z.string().optional(),
  email: z.string().email(),
  webpage: z.string().optional(),
})

export type GroupFormValues = z.infer<typeof GroupFormSchema>

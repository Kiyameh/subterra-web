import {z} from 'zod'
import {groupCategories} from '@/database/models/Group.enums'
import countries from '@/database/data/countries.json'
import states from '@/database/data/states.json'

/**
 * @const Nombres de países para las validaciones
 */
const countryNames = countries.map((country) => country.native)
/**
 * @const Nombres de provincias para las validaciones
 */
const stateNames = states.map((state) => state.name)
/**
 * @const Máximos de caracteres permitidos en los campos de un grupo
 */

export const groupMaxCharacters = {
  name: 16,
  fullname: 40,
  acronym: 6,
  description: 250,
  street: 50,
  portal_number: 10,
  floor: 10,
  door: 10,
  postal_code: 99999,
  city: 100,
  phone: 20,
  email: 99,
  webpage: 100,
}

/**
 * @schema de Zod para validar formulario de creación de grupo
 */

export const GroupFormSchema = z.object({
  // Datos generales:
  name: z
    .string()
    .min(3, {message: 'Mínimo 3 caracteres'})
    .max(groupMaxCharacters.name, {
      message: `Máximo ${groupMaxCharacters.name} caracteres`,
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Solo puede contener letras, números y guiones bajos',
    })
    .trim(),
  fullname: z
    .string()
    .min(3, {message: 'Mínimo 3 caracteres'})
    .max(groupMaxCharacters.fullname, {
      message: `Máximo ${groupMaxCharacters.fullname} caracteres`,
    }),
  acronym: z
    .string()
    .max(groupMaxCharacters.acronym, {
      message: `Máximo ${groupMaxCharacters.acronym} caracteres`,
    })
    .optional(),
  description: z
    .string()
    .max(groupMaxCharacters.description, {
      message: `Máximo ${groupMaxCharacters.description} caracteres`,
    })
    .optional(),
  group_categories: z.array(z.enum(groupCategories)).optional(),
  main_image: z.string().optional(),
  logo_image: z.string().optional(),

  // Datos de contacto:
  street: z
    .string()
    .max(groupMaxCharacters.street, {message: 'Demasiado largo'})
    .optional(),
  portal_number: z
    .string()
    .max(groupMaxCharacters.portal_number, {message: 'Demasiado largo'})
    .optional(),
  floor: z
    .string()
    .max(groupMaxCharacters.floor, {message: 'Demasiado largo'})
    .optional(),
  door: z.string().optional(),
  //? Propiedad coerce para obligar a que el valor sea un número
  postal_code: z.coerce
    .number({message: 'Introduce un número'})
    .max(groupMaxCharacters.postal_code, {message: 'Demasiado largo'})
    .optional(),
  city: z
    .string()
    .max(groupMaxCharacters.city, {message: 'Demasiado largo'})
    .optional(),
  province: z.string().refine((name) => stateNames.includes(name), {
    message: 'El nombre de la provincia no es válido',
  }),
  country: z.string().refine((name) => countryNames.includes(name), {
    message: 'El nombre del país no es válido',
  }),
  phone: z
    .string()
    .max(groupMaxCharacters.phone, {message: 'Demasiado largo'})
    .optional(),
  email: z
    .string()
    .email({message: 'Email incorrecto'})
    .max(groupMaxCharacters.email, {message: 'Demasiado largo'})
    .optional(),
  webpage: z
    .string()
    .max(groupMaxCharacters.webpage, {message: 'Demasiado largo'})
    .optional(),
})

/**
 * @type Tipo de los datos introducidos en el formulario de creación de grupo.
 */
export type GroupFormValues = z.infer<typeof GroupFormSchema>

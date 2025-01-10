import {z} from 'zod'

/**
 * @const Máximos de caracteres permitidos en los campos de un usuario
 */

export const userMaxCharacters = {
  name: 20,
  email: 99,
  fullname: 40,
  password: 20,
}

/**
 * @schema de Zod para validar formulario de inicio de sesión
 */

export const SignInSchema = z.object({
  email: z
    .string()
    .email({message: 'Email requerido'})
    .max(userMaxCharacters.email, {message: 'Demasiado largo'}),
  password: z
    .string()
    .min(1, {message: 'Contraseña requerida'})
    .max(userMaxCharacters.password, {message: 'Demasiado largo'}),
})

/**
 * @type Tipo de los datos introducidos en el formulario de inicio de sesión.
 */
export type SignInValues = z.infer<typeof SignInSchema>

/**
 * @schema de Zod para validar formulario de registro
 */
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(3, {message: 'Requerido'})
      .max(userMaxCharacters.name, {message: 'Demasiado largo'})
      .trim()
      .toLowerCase(),
    fullname: z
      .string()
      .max(userMaxCharacters.fullname, {message: 'Demasiado largo'})
      .trim(),
    email: z
      .string()
      .email({message: 'Email requerido'})
      .max(userMaxCharacters.email, {message: 'Demasiado largo'}),
    password: z
      .string()
      .min(8, {message: 'Mínimo 8 caracteres'})
      .max(userMaxCharacters.password, {message: 'Demasiado largo'})
      .regex(/[a-z]/, {
        message: 'Incluye una letra minúscula',
      })
      .regex(/[A-Z]/, {
        message: 'Incluye una letra mayúscula',
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation'],
  })

/**
 * @type Tipo de los datos introducidos en el formulario de registro.
 */

export type SignUpValues = z.infer<typeof SignUpSchema>

/**
 * @schema de Zod para validar formulario de reinicio de contraseña
 */
export const ResetPassSchema = z
  .object({
    email: z.string().email({message: 'Email requerido'}),
    password: z
      .string()
      .min(8, {message: 'Mínimo 8 caracteres'})
      .max(userMaxCharacters.password, {message: 'Demasiado largo'})
      .regex(/[a-z]/, {
        message: 'Incluye una letra minúscula',
      })
      .regex(/[A-Z]/, {
        message: 'Incluye una letra mayúscula',
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation'],
  })

/**
 * @type Tipo de los datos introducidos en el formulario de actualización de password.
 */

export type ResetPassValues = z.infer<typeof ResetPassSchema>

/**
 * @schema de Zod para validar formulario de editar perfil
 */
export const ProfileEditSchema = z.object({
  name: z
    .string()
    .min(3, {message: 'Requerido'})
    .max(userMaxCharacters.name, {message: 'Demasiado largo'})
    .trim()
    .toLowerCase(),
  fullname: z
    .string()
    .max(userMaxCharacters.fullname, {message: 'Demasiado largo'})
    .trim(),
  email: z.string().email({message: 'Email requerido'}),
})

/**
 * @type Tipo de los datos introducidos en el formulario de registro.
 */

export type ProfileEditValues = z.infer<typeof ProfileEditSchema>

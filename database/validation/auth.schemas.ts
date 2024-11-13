import {z} from 'zod'

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email no válido',
  }),
  password: z.string().min(1, {message: 'Contraseña requerida'}),
})

export type SignInValues = z.infer<typeof SignInSchema>

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(3, {message: 'Requerido'})
      .max(20, {message: 'Demasiado largo'})
      .trim()
      .toLowerCase(),
    fullname: z.string().max(40, {message: 'Demasiado largo'}).trim(),
    email: z.string().email({message: 'Email incorrecto'}),
    password: z
      .string()
      .min(8, {message: 'Mínimo 8 caracteres'})
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

export type SignUpValues = z.infer<typeof SignUpSchema>

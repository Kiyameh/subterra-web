import {z} from 'zod'

export const SigninSchema = z.object({
  email: z.string().email({
    message: 'Email no válido',
  }),
  password: z.string().min(1, {message: 'Contraseña requerida'}),
})

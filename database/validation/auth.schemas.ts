import {z} from 'zod'

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email no válido',
  }),
  password: z.string().min(1, {message: 'Contraseña requerida'}),
})

export type SignInValues = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Email no válido',
  }),
  name: z.string().min(1, {message: 'Nombre requerido'}),
  fullname: z.string().optional(),
  password: z.string().min(8, {message: 'Mínimo 8 caracteres'}),
  passwordConfirmation: z.string().min(8, {message: 'Mínimo 8 caracteres'}),
})

export type SignUpValues = z.infer<typeof SignUpSchema>

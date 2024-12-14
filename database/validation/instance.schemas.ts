import {z} from 'zod'

export const InstanceFormSchema = z.object({
  name: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(12, {message: 'Demasiado largo'}),
  fullname: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(50, {message: 'Demasiado largo'}),
  acronym: z.string(),
  description: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(1000, {message: 'Demasiado largo'}),
  territory: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(50, {message: 'Demasiado largo'}),
  owner: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(24, {message: 'Demasiado largo'}),
  coordinator: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(24, {message: 'Demasiado largo'}),
  public_visibility: z.boolean().default(true),
  public_edition: z.boolean().default(false),
})

export type InstanceFormValues = z.infer<typeof InstanceFormSchema>

export const UpdateInstanceFormSchema = z.object({
  fullname: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(50, {message: 'Demasiado largo'}),
  acronym: z.string(),
  description: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(1000, {message: 'Demasiado largo'}),
  territory: z
    .string()
    .min(1, {message: 'Requerido'})
    .max(50, {message: 'Demasiado largo'}),
})

export type UpdateInstanceFormValues = z.infer<typeof UpdateInstanceFormSchema>

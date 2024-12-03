import {AnyZodObject, ZodString} from 'zod'

/**
 * @description Devuelve el límite de caracteres máximo de un campo de un esquema de Zod.
 * @param schema Esquema en el que buscar
 * @param field Campo requerido
 * @returns number | null
 */
export const maxCharacterLimit = (
  schema: AnyZodObject,
  field: string
): number | null => {
  const shape = schema.shape[field] as ZodString
  const maxCheck = shape._def.checks.find((check) => check.kind === 'max')
  return maxCheck ? maxCheck.value : null
}

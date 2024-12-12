import {AnyZodObject, ZodString} from 'zod'

/**
 * @description Devuelve los límites de caracteres máximos de todos los campos de un esquema de Zod que tengan una sentencia "max".
 * @param schema Esquema en el que buscar
 * @returns Objeto con los límites de caracteres máximos de los campos que tengan una sentencia "max".
 * @format {nombredecampo: límite} o {nombredecampo: null}
 */
export const maxCharacterLimits = (
  schema: AnyZodObject
): Record<string, number | null> => {
  const maxLimits: Record<string, number | null> = {}

  for (const [field, fieldSchema] of Object.entries(schema.shape)) {
    if (fieldSchema instanceof ZodString) {
      const maxCheck = (fieldSchema as ZodString)._def.checks.find(
        (check) => check.kind === 'max'
      )
      if (maxCheck) {
        maxLimits[`${field}`] = maxCheck.value
      } else {
        maxLimits[`${field}`] = null
      }
    }
  }

  return maxLimits
}

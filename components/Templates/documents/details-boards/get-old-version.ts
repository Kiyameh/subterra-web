/**
 * @version 1
 * @description Obtener una versión anterior de un documento
 * @param document documento a modificar
 * @param version número de versión solicitada
 */

export function getOldVersion<
  T extends {
    updatedAt: Date
    __v: number
    versions: Array<Record<string, unknown> & {__v: number; updatedAt?: Date}>
  },
>(document: T, version: number): T {
  const currentVersion = document.__v

  // Verificar si la versión solicitada es válida
  if (version === currentVersion) {
    return document
  }

  if (version > currentVersion) {
    console.error('La versión solicitada es mayor que la actual')
    return document
  }

  // Crear una copia del documento para evitar mutaciones
  const result: T = {...document}

  // Aplicar las versiones en orden decreciente
  for (let i = currentVersion - 1; i >= version; i--) {
    const changes = document.versions.find((v) => v.__v === i)
    if (changes) {
      // Iterar sobre las propiedades dinámicas
      Object.entries(changes).forEach(([key, value]) => {
        // Actualizar las claves dinámicas y el campo updatedAt
        if (key !== '__v') {
          ;(result as Record<string, unknown>)[key] = value
        }
      })
    }
  }

  // Actualizar los campos __v y updatedAt con los valores solicitados
  const lastVersion = document.versions.find((v) => v.__v === version)
  if (lastVersion?.updatedAt) {
    result.updatedAt = lastVersion.updatedAt
  }

  result.__v = version
  return result
}

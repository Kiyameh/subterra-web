/**
 * @description Longitud máxima de campo de texto gigante
 */
export const hugeText = 5000

/**
 * @description Longitud máxima de campo de texto grande
 */
export const bigText = 1000

/**
 * @description Longitud máxima de campo de texto mediano
 */
export const mediumText = 250

/**
 * @description Longitud máxima de campo de texto pequeño
 */
export const smallText = 40

/**
 * @description Longitud máxima de campo de texto enano
 */
export const tinyText = 10

/**
 * @description Longitud máxima de cavidad
 */
export const maxLenght = 400000

/**
 * @description Profundidad máxima de cavidad
 */
export const maxDepth = 2500

/**
 * Objeto de propiedades para zod.
 * @value {message: 'Demasiado largo'}
 */
export const maxCharMsg = {message: 'Demasiado largo'}

/**
 * Objeto de propiedades para zod.
 * @value {message: 'Demasiado corto'}
 */
export const minCharMsg = {message: 'Demasiado corto'}

/**
 * @description Expresión regular para el OID
 * @value /^[0-9a-fA-F]{24}$/
 */

export const OIDRegex = /^[0-9a-fA-F]{24}$/
/**
 * Objeto de propiedades para zod.
 * @value {message: 'OID incorrecto'}
 */

export const OIDMsg = {message: 'OID incorrecto'}

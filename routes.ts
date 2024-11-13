/** Rutas públicas:
 *  No requieren autenticación
 */

export const publicRoutes = ['/', '/behind-the-scenes']

/** Prefijo de las rutas de API de nextAuth:
 *  No requieren autenticación
 */

export const authApiPrefix = '/api/auth/'

/** Rutas de servicios de autenticación
 *  No accesibles si el usuario ya está logueado
 */

export const authorizationRoutes = [
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
]

/** Rutas para usuarios registrados
 *  Solo accesibles si el usuario está logueado
 *  Redireccionan a /signin si el usuario no está logueado
 */

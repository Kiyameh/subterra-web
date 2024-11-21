import {NextAuthConfig} from 'next-auth'
/**
 * ? Configuración de next-auth sin conexión a la base de datos, para emplear en el middleware
 * ? y que pueda funcionar en el edge runtime.
 * ? No es necesaria la BBDD porque el middleware solo comprueba la sesión y la ruta a la que se dirige el usuario.
 * ? Actualizar cuando el edge runtime soporte la conexión a la base de datos.
 * ? https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */

const authConfigInTheEdge: NextAuthConfig = {
  providers: [],
}

export default authConfigInTheEdge

import NextAuth from 'next-auth'
import authConfigInTheEdge from './auth.edge.config'

const {auth} = NextAuth(authConfigInTheEdge)
export default auth(async function middleware() {
  /*   
  ('middleware working')
  ('req:', req.nextUrl.pathname) --> Obtener próxima ruta
  ('auth:', req.auth) --> Obtener usuario actual
  */
  //TODO: Añadir lógica de autorización si es necesario
})

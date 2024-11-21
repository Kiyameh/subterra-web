import NextAuth from 'next-auth'
import authConfigInTheEdge from './auth.edge.config'

const {auth} = NextAuth(authConfigInTheEdge)
export default auth(async function middleware(req) {
  console.log('middleware working')
  console.log('req:', req.nextUrl.pathname)
  console.log('auth:', req.auth)

  //TODO: Añadir lógica de autorización
})

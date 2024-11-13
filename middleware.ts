import {auth} from '@/auth'
import {authApiPrefix, authorizationRoutes, publicRoutes} from './routes'
import {NextResponse} from 'next/server'

export default auth((req) => {
  //const loggedUser = !!req.auth?.user
  const nextPath = req.nextUrl.pathname
  const isLogged = !!req.auth

  console.log('nextPath', nextPath)
  console.log('isLogged', isLogged)

  if (publicRoutes.includes(nextPath)) {
    console.log('CASO 1 Páginas públicas')
    return NextResponse.next()
  }
  if (nextPath.startsWith(authApiPrefix)) {
    console.log('CASO 2 API de NextAuth')
    return NextResponse.next()
  }

  if (authorizationRoutes.includes(nextPath)) {
    if (isLogged) {
      console.log('CASO 3 Páginas de autenticación + logueado')
      return NextResponse.redirect(new URL('/profile', req.nextUrl))
    } else {
      console.log('CASO 4 Páginas de autenticación + no logueado')
      return NextResponse.next()
    }
  }
  if (!isLogged && !publicRoutes.includes(nextPath)) {
    console.log('CASO 5 Páginas privadas + no logueado')
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
})

// Rutas en las que se ejecutará el middleware (todas salvo algunas de next y los archivos estáticos)
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

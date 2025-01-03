import NextAuth from 'next-auth'
import type {DefaultSession, User} from 'next-auth'
import type {DefaultJWT} from 'next-auth/jwt'

import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import {checkCredentials} from '@/database/services/user.actions'
import {findUserByEmail} from '@/database/services/user.actions'
import {signUpWithGoogle} from '@/database/services/user.actions'
import {SignInValues} from '@/database/validation/auth.schemas'

export const {auth, handlers, signIn, signOut} = NextAuth({
  // Configuración de la sesión:
  session: {strategy: 'jwt'},
  // Páginas personalizadas:
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  // Proveedores de inicio de sesión:
  providers: [
    // Configuración de inicio de sesión con credenciales:
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //? Retorna un objeto con el usuario si las credenciales son correctas, en caso contrario false
        return await checkCredentials(credentials as SignInValues)
      },
    }),
    // Configuración de inicio de sesión con Google:
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Callbacks de autenticación:
  callbacks: {
    // Función que se ejecuta al iniciar sesión:
    async signIn({account, profile}) {
      // En caso de iniciar sesión con Google:
      if (account?.provider === 'google') {
        // Buscar usuario en base de datos:
        const existingUser = await findUserByEmail(profile?.email)

        if (!existingUser) {
          // Guardar usuario externo si no se encuentra en la base de datos:
          const saved = await signUpWithGoogle(profile)
          if (!saved) throw new Error('Error al guardar el usuario externo')
        }
      }

      return true
    },

    // Función que se ejecuta al crear un token:
    async jwt({token, user, account}) {
      // Añadir ID de usuario al token
      if (account?.provider === 'google') {
        // Si se inicia sesión con Google, buscar usuario en base de datos:
        const dbUser = await findUserByEmail(user?.email)
        token._id = dbUser._id.toString()
      } else if (user) {
        // Si se inicia sesión con credenciales, añadir ID de usuario al token:
        token._id = (user as ExtendedUser)._id
      }

      return token
    },
    // Función que se ejecuta al crear una sesión:
    async session({session, token}) {
      // Introducir ID en la sesión:
      if (session?.user) {
        session.user._id = token._id
      }
      return session
    },
  },
})

// ? Extensión de las interfaces de User, token y session para añadir ID
// Tipos de usuario extendidos con ID:
interface ExtendedUser extends User {
  _id: string
}

// Tipos de token extendidos con ID:
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    _id?: string
  }
}
// Tipos de sesión extendidos con ID:
declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string
    } & DefaultSession['user']
  }
}

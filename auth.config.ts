import {DefaultSession, NextAuthConfig, User} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import {DefaultJWT} from 'next-auth/jwt'

import {SignInValues} from '@/database/validation/auth.schemas'
import {checkCredentials} from './database/services/user.services'
import {UserDocument} from './database/models/User.model'

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

//? Configuración de next-auth

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Comprobar credenciales:
        const response = await checkCredentials(credentials as SignInValues)

        if (response.ok) {
          // Responder con los datos del usuario que se guardarán en el token:
          const user = response.content as UserDocument
          return {
            email: user.email,
            name: user.name,
            image: user.image,
            _id: user._id,
          }
        } else {
          // Ir a la pantalla de SinginError
          throw new Error(response.message)
        }

        return null
      },
    }),
    Google({}),
  ],
  callbacks: {
    async jwt({token, user}) {
      const extendedUser = user as ExtendedUser
      // Introducir roles en el token:
      if (extendedUser) {
        token._id = extendedUser._id
      }

      return token
    },
    async session({session, token}) {
      // Introducir roles e ID en la sesión:
      if (session?.user) {
        session.user._id = token._id
      }

      return session
    },
  },
}

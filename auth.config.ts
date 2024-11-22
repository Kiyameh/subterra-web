import {DefaultSession, NextAuthConfig, User} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import {DefaultJWT} from 'next-auth/jwt'

import {checkCredentials} from '@/database/actions/auth/checkCredentials'
import {SignInValues} from '@/database/validation/auth.schemas'

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

        if (response.data) {
          // Responder con los datos del usuario que se guardarán en el token:
          return {
            email: response.data.email,
            name: response.data.name,
            image: response.data.image,
            _id: response.data._id,
          }
        } else if (response.error) {
          // Ir a la pantalla de SinginError
          throw new Error(response.error)
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

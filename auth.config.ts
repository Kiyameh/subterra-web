import {DefaultSession, NextAuthConfig, User} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import {DefaultJWT} from 'next-auth/jwt'

import {checkCredentials} from '@/database/actions/auth/checkCredentials'
import {SignInValues} from '@/database/validation/auth.schemas'

// ? Extensión de las interfaces de User, token y session para añadir roles e ID
//TODO: Cuando se haga la populación de roles, cambiar el tipo de los roles a un tipo correcto
// Tipos de usuario extendidos con roles e ID:
interface ExtendedUser extends User {
  instance_roles: string[]
  group_roles: string[]
  _id: string
}

// Tipos de token extendidos con roles e ID:
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    group_roles?: string[]
    instance_roles?: string[]
    _id?: string
  }
}
// Tipos de sesión extendidos con roles e ID:
declare module 'next-auth' {
  interface Session {
    user: {
      instance_roles?: string[]
      group_roles?: string[]
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
            group_roles: response.data.group_roles,
            instance_roles: response.data.instance_roles,
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
        token.group_roles = extendedUser.group_roles
        token.instance_roles = extendedUser.instance_roles
        token._id = extendedUser._id
      }

      return token
    },
    async session({session, token}) {
      // Introducir roles e ID en la sesión:
      if (session?.user) {
        session.user.group_roles = token.group_roles
        session.user.instance_roles = token.instance_roles
        session.user._id = token._id
      }

      return session
    },
  },
}

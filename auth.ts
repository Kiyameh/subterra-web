import NextAuth, {CredentialsSignin} from 'next-auth'
import {MongoDBAdapter} from '@auth/mongodb-adapter'
import type {DefaultSession, User} from 'next-auth'
import type {DefaultJWT} from 'next-auth/jwt'

import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

import databaseClient from '@/database/databaseClient'
import {
  checkCredentials,
  checkVerifiedEmail,
  verifyEmail,
} from '@/database/services/user.actions'
import {findUserByEmail} from '@/database/services/user.actions'
import {SignInValues} from '@/database/validation/auth.schemas'
import {
  verifyMailHTMLTemplate,
  verifyMailTextTemplate,
} from './mail/account-verification'

class NotVerifiedError extends CredentialsSignin {
  code = 'not_verified'
}

export const {auth, handlers, signIn, signOut} = NextAuth({
  // 1. Estrategia de inicio de sesión:
  session: {strategy: 'jwt'},
  // 2. Páginas personalizadas:
  pages: {
    signIn: '/auth/login',
  },
  // 3. Adaptador de base de datos:
  adapter: MongoDBAdapter(databaseClient, {databaseName: 'subterra'}),

  // 4. Proveedores de inicio de sesión:
  providers: [
    //4.1 Proveedor de credenciales:
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const verified = await checkVerifiedEmail(credentials.email as string)

        if (!verified) throw new NotVerifiedError('Email no verificado')

        const validUser = await checkCredentials(credentials as SignInValues)

        if (!validUser) throw new Error('Credenciales incorrectas')

        return validUser
      },
    }),
    // 4.2 Proveedor de Google:
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified, // Para confirmar email
        }
      },
    }),
    Resend({
      from: 'info@mail.subterra.app',
      sendVerificationRequest: async (params) => {
        const {identifier: to, provider, url} = params
        const {host} = new URL(url)
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: provider.from,
            to,
            subject: 'Confirma tu cuenta de Subterra',
            text: verifyMailTextTemplate(url, host),
            html: verifyMailHTMLTemplate(url),
          }),
        })

        if (!res.ok)
          throw new Error('Resend error: ' + JSON.stringify(await res.json()))
      },
    }),
  ],

  // 5. Callbacks:
  callbacks: {
    // 5.1 Callback al crear el token:
    async jwt({token, user, account}) {
      if (account?.provider === 'google' || account?.provider === 'resend') {
        // Verificar el email:
        await verifyEmail(user.email)
        // Buscar usuario en base de datos y añadir _id al token:
        const dbUser = await findUserByEmail(user?.email)
        token._id = dbUser._id.toString()
      } else if (user) {
        // Si se inicia sesión con credenciales, añadir _id de usuario al token:
        token._id = (user as ExtendedUser)._id
      }

      return token
    },
    // 5.2 Callback al crear la sesión:
    async session({session, token}) {
      // Introducir _id en la sesión:
      if (session?.user) {
        session.user._id = token._id
      }
      return session
    },
  },
})

// ? Extensión de las interfaces de User, token y session para añadir _id:
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

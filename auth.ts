import NextAuth from 'next-auth'
import {MongoDBAdapter} from '@auth/mongodb-adapter'
import type {DefaultSession, User} from 'next-auth'
import type {DefaultJWT} from 'next-auth/jwt'

import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import {findUserByCredentials} from '@/database/services/User/findUserByCredentials'
import {findUserByEmail} from '@/database/services/User/findUserByEmail'

import databaseClient from '@/database/databaseClient'

import {verifyMailTextTemplate} from '@/mail/account-verification'
import {verifyMailHTMLTemplate} from '@/mail/account-verification'

export const {handlers, auth, signIn, signOut} = NextAuth({
  session: {strategy: 'jwt'},
  adapter: MongoDBAdapter(databaseClient, {databaseName: 'subterra'}),
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null
        return await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        )
      },
    }),
    Resend({
      from: 'info@mail.subterra.app',
      // Función para enviar el email de verificación (modelo en text y html):
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

  callbacks: {
    // 1 Callback al crear el token:
    async jwt({token, user, account}) {
      if (account?.provider === 'google' || account?.provider === 'resend') {
        // Buscar usuario en base de datos y añadir _id al token:
        const dbUser = await findUserByEmail(user?.email)
        token._id = dbUser._id.toString()
      } else if (user) {
        // Si se inicia sesión con credenciales, añadir _id de usuario al token:
        token._id = (user as ExtendedUser)._id
      }

      return token
    },
    // 2 Callback al crear la sesión:
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

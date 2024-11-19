import {checkCredentials} from '@/database/actions/auth/checkCredentials'
import {SignInValues} from '@/database/validation/auth.schemas'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return checkCredentials(credentials as SignInValues)
      },
    }),
  ],
})

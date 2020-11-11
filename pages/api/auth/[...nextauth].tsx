import { NextApiHandler } from 'next'
import NextAuth, { User } from 'next-auth'
import { SessionBase } from 'next-auth/_utils'
import Providers from 'next-auth/providers'

const {
  TYPEORM_CONNECTION,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_DATABASE,
} = process.env

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  database: `${TYPEORM_CONNECTION}://${TYPEORM_USERNAME}:${TYPEORM_PASSWORD}@${TYPEORM_HOST}:${TYPEORM_PORT}/${TYPEORM_DATABASE}`,
  secret: process.env.SECRET,
  callbacks: {
    session: async (session: SessionBase) => {
      return { ...session, rol: 'tutor' }
    },
    signIn: async (user: User) => {
      const ALLOWED_USERS = ['bsoto@thoughtworks.com', 'bherreran24@gmail.com']
      return ALLOWED_USERS.includes(user.email)
    },
    redirect: async () => {
      const redirectTo: string | undefined = '/'
      return redirectTo
    },
  },
  session: {
    jwt: true,
  },
  pages: {
    error: '/_error',
  },
}

const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options)

export default NextAuthHandler

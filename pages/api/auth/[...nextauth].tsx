import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { UserService } from 'src/services/UserService'

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
const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
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
      session: async (session, user) => {
        const userService = new UserService()

        const allowedUser = await userService.getByEmail(user.email)
        if (!allowedUser) {
          return session
        }

        return { ...session, role: allowedUser.role }
      },
      signIn: async (user) => {
        const userService = new UserService()
        return userService.existByEmailAndUpdateName(user)
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
  })

export default NextAuthHandler

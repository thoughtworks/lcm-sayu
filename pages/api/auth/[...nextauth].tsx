import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/database
  //
  // Notes:
  // * You must to install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: 'postgres://test:test@127.0.0.1:5432/test',

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,
  // callbacks: {
  //   jwt: async (token, user) => {
  //     if (user) {
  //       token = { roles: user.roles }
  //     }

  //     return token
  //   },
  //   session: async (session, token) => {
  //     session.roles = token.roles
  //     return session
  //   },

  //   signIn: async (user, account, profile) => {
  //     console.log(user)
  //     // if (user.email === 'bherreran24@gmail.com') {
  //     //   //user.roles = ['tutor', 'enfermera']
  //     //   return true
  //     // }
  //     return false
  //   },
  //   // preguntar si usuario esta en tabla de permitidos y se pueden verificar roles
  // },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
}

const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options)

export default NextAuthHandler

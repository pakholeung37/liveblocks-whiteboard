import { SolidAuth, type SolidAuthConfig } from '@auth/solid-start'
import Credentials from '@auth/core/providers/credentials'
// import GitHub from '@auth/core/providers/github'
import { User } from '~/types'
import { getUser } from '~/lib/server'

// Your NextAuth secret (generate a new one for production)
// More info: https://next-auth.js.org/configuration/options#secret
export const authOpts: SolidAuthConfig = {
  callbacks: {
    // Get extra user info from your database to pass to front-end
    // For front end, update next-auth.d.ts with session type
    async session({ session }: { session: any }) {
      const userInfo: User | null = await getUser(session.user.email)

      if (!userInfo) {
        throw new Error('User not found')
      }

      session.user.info = userInfo
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  // More info: https://next-auth.js.org/providers/
  providers: [
    // CredentialsProvider is used for the demo auth system
    // Replace this with a real provider, e.g. GitHub, Auth0
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const user: User | null = await getUser(credentials.email)
        // const user: User = {
        //   id: '0',
        //   name: 'pakho leung',
        //   color: 'red',
        //   groupIds: ['0'],
        // }

        if (!user) {
          throw new Error('User not found')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.id,
          image: user.avatar,
        }
      },
    }),

    // Use GitHub authentication
    // GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    /*
    // Use Auth0 authentication
    // import Auth0Provider from "next-auth/providers/auth0";
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
    */

    // ...add more providers here
  ],
}

export const { GET, POST } = SolidAuth(authOpts)

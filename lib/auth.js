import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from './db'
import User from '@/models/User'

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [

    // Google Login
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Facebook Login
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    // Email / Password Login
    Credentials({
      name: 'credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {

          if (!credentials?.email || !credentials?.password) {
            return null
          }

          await connectDB()

          const user = await User.findOne({
            email: credentials.email,
          }).lean()

          if (!user) {
            console.log('User not found')
            return null
          }

          if (!user.password) {
            console.log('No password set')
            return null
          }

          const isPasswordCorrect = await bcrypt.compare(
            String(credentials.password),
            String(user.password)
          )

          if (!isPasswordCorrect) {
            console.log('Wrong password')
            return null
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.profileImage || '',
            role: user.role || 'alumni',
            status: user.status || 'pending',
          }

        } catch (error) {
          console.error('Authorize error:', error)
          return null
        }
      },
    }),
  ],

  callbacks: {

    // OAuth login (Google + Facebook)
    async signIn({ user, account }) {

      if (account?.provider === 'google' || account?.provider === 'facebook') {

        try {

          await connectDB()

          const existingUser = await User.findOne({
            email: user.email,
          })

          if (!existingUser) {

            await User.create({
              name: user.name,
              email: user.email,
              profileImage: user.image || '',
              memberId: 'HPCAA-' + Date.now(),
              status: 'active',
              role: 'alumni',
            })

          }

        } catch (error) {
          console.error('OAuth signIn error:', error)
          return false
        }
      }

      return true
    },

    // JWT token
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id
        token.role = user.role
        token.status = user.status
      }

      return token
    },

    // Session data
    async session({ session, token }) {

      if (token && session.user) {

        session.user.id = token.id
        session.user.role = token.role
        session.user.status = token.status

      }

      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  trustHost: true,
})
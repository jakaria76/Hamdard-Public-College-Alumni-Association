import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from './db'
import User from '@/models/User'

export const { handlers, signIn, signOut, auth } = NextAuth({

  trustHost: true,

  providers: [

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null

          await connectDB()

          const user = await User.findOne({
            email: credentials.email,
          }).lean()

          if (!user || !user.password) return null

          const isPasswordCorrect = await bcrypt.compare(
            String(credentials.password),
            String(user.password)
          )

          if (!isPasswordCorrect) return null

          return {
            id: user._id.toString(),  // ← MongoDB ObjectId string
            name: user.name,
            email: user.email,
            image: user.profileImage || '',
            role: user.role || 'alumni',
            status: user.status || 'active',
          }

        } catch (error) {
          console.error('Authorize error:', error)
          return null
        }
      },
    }),
  ],

  callbacks: {

    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectDB()

          let dbUser = await User.findOne({ email: user.email })

          if (!dbUser) {
            dbUser = await User.create({
              name: user.name,
              email: user.email,
              profileImage: user.image || '',
              memberId: 'HPCAA-' + Date.now(),
              status: 'active',
              role: 'alumni',
            })
          }

          // Google user এর id = MongoDB _id করো
          user.id = dbUser._id.toString()
          user.role = dbUser.role || 'alumni'
          user.status = dbUser.status || 'active'

        } catch (error) {
          console.error('OAuth signIn error:', error)
          return false
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id        // ← MongoDB _id
        token.role = user.role
        token.status = user.status
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id      // ← MongoDB _id
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
})
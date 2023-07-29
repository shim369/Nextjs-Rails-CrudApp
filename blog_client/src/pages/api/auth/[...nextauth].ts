import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await fetch("http://localhost:3001/api/sessions", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()

        if (res.ok && user) {
          return Promise.resolve(user)
        }
        return Promise.resolve(null)
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    session: async ({session, user}) => {
      session.user = user
      return Promise.resolve(session)
    },
  },
  pages: {
    signIn: '/admin',
    signOut: '/login',
    error: '/login', 
    verifyRequest: '/verify', 
  },
})

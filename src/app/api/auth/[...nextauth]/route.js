import { dbConnect } from "@/lib/dbConnect";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";


// const userList = [
//   { name: "hablu", password: "1234" },
//   { name: "dablu", password: "5678" },
//   { name: "bablu", password: "8901" },
// ];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Email & Password',

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email type" },
        password: { label: "Password", type: "password",  placeholder: "Enter password" },
        secreatCode: { label: "Password", type: "number", placeholder: 'enter code here' }
      },

      async authorize(credentials, req) {
        const {email, password} = credentials;

        // const user = userList.find((u) => u.name == username);
        const user = await dbConnect("users").findOne({email});
        if(!user) return null;

        // const isPassWordOk = user.password == password;
        const isPassWordOk = await bcrypt.compare(password, user.password)
        if(isPassWordOk) {
          return user;
        }

        console.log(username, password);

        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      if(token) {
        session.role = token.role
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token
    }
  }
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
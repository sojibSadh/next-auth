import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";


const userList = [
  { name: "hablu", password: "1234" },
  { name: "dablu", password: "5678" },
  { name: "bablu", password: "8901" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Email & Password',

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        secreatCode: { label: "Password", type: "number", placeholder: 'enter code here' }
      },

      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;
        const user = userList.find((u) => u.name == username);
        if(!user) return null;
        const isPassWordOk = user.password == password;
        if(isPassWordOk) {
          return user;
        }

        console.log(username, password);

        return null;
      }
    })
  ]
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
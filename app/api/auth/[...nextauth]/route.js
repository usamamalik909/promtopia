import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Trim the username and remove spaces
        const cleanedUsername = profile.name.trim().replace(/\s/g, '');

        // Check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: cleanedUsername.toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Sign-in successful
      } catch (error) {
        console.error(error);
        return false; // Sign-in failed
      }
    },
  },
});

export { handler as GET, handler as POST };

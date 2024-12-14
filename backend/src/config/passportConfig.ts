// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// import dotenv from "dotenv";
// import { IUser, User } from "../models/User";
// dotenv.config();

// // Define the type for the user object we expect to store in the session
// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL!,
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: (error: any, user?: Express.User | false) => void
//     ) => {
//       try {
//         console.log("testing");
//         // Check if the user already exists in your DB based on Google ID
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           // If the user does not exist, create a new user document
//           const email = profile.emails && profile.emails[0]?.value; // Safely access emails
//           user = new User({
//             googleId: profile.id,
//             username: profile.displayName,
//             email: email || "", // If email is missing, default to an empty string or handle accordingly
//             profilePicture: profile.photos ? profile.photos[0].value : "", // Handle case where photos might be undefined
//           });

//           // Save the new user to DB
//           await user.save();
//         }

//         // Return the user object after successful authentication
//         return done(null, user as Express.User);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

// // Serialize user: Store the user ID in the session
// passport.serializeUser(
//   (user: Express.User, done: (err: any, id?: string) => void) => {
//     done(null, (user as IUser)._id.toString());
//   }
// );

// // Deserialize user: Retrieve the user from the database using the stored ID
// passport.deserializeUser(
//   async (id: string, done: (err: any, user?: Express.User | null) => void) => {
//     try {
//       const user = await User.findById(id).exec();
//       done(null, user as Express.User);
//     } catch (error) {
//       done(error, null);
//     }
//   }
// );

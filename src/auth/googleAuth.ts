import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
            try {
                let user = await User.findOne({ where: { email: profile.emails?.[0].value } });

                if (!user) {
                    user = await User.create({
                        email: profile.emails?.[0].value,
                        name: profile.displayName,
                        profilePicture: profile.photos?.[0].value,
                        authProvider: "Google",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user: any, done: (error: any, id?: any) => void) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (error: any, user?: any) => void) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;


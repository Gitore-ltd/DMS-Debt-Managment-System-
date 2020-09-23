import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => done(null, user));

const getUser = (accessToken, refreshToken, profile, done) => {
  done(null, profile);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    getUser,
  ),
);

passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTGRM_CLIENT_ID,
      clientSecret: process.env.INSTGRM_CLIENT_SECRET,
      callbackURL: process.env.INSTGRM_CALLBACK_URL,
    },
    getUser,
  ),
);

export default passport;

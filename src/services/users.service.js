const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const Users = require('../models');

const FACEBOOK_CLIENT_ID = 'your_facebook_client_id';
const FACEBOOK_CLIENT_SECRET = 'your_facebook_client_secret';
const GOOGLE_CLIENT_ID = 'your_google_client_id';
const GOOGLE_CLIENT_SECRET = 'your_google_client_secret';

passport.use('facebook', new OAuth2Strategy({
    authorizationURL: 'https://www.facebook.com/v13.0/dialog/oauth',
    tokenURL: 'https://graph.facebook.com/v13.0/oauth/access_token',
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        // Save user to database
        const user = await Users.create({ facebookId: profile.id });
        done(null, user);
    }
));

passport.use('google', new OAuth2Strategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        // Save user to database
        const user = await Users.create({ googleId: profile.id });
        done(null, user);
    }
));

const loginWithFacebook = passport.authenticate('facebook');
const loginWithFacebookCallback = passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
});

const loginWithGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });
const loginWithGoogleCallback = passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
});

module.exports = {
    loginWithFacebook,
    loginWithFacebookCallback,
    loginWithGoogle,
    loginWithGoogleCallback
}
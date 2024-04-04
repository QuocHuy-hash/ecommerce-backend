const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const Users = require('../models');
const FACEBOOK_CLIENT_ID = '730959155896522';
const FACEBOOK_CLIENT_SECRET = 'c4b5b6b58cc5eeb7c6ef8a8980f1dedd';
const TOKEN_URL = 'https://graph.facebook.com/v12.0/oauth/EAAKYzbDVIMoBO6eKjS2pSak6wnLGgrB0eoPqeo63X4FK7Gs4YCZA4zZCuxfvrdrysU3nqszUHOQKp6QvoWv5e1Hx3zyTSiTZCofNvgxf3mr9RpTTag6aqniCZC9qA0EKrqWJH9bkZCxF9NVqqDcw1LJs4vlTJpzmyKAWw98p4K1VrfX53s28iYSaHfWebZBwOfmqJBOzqAucitLYqVsLQAIZBJhLPGjSw6g0uHYb05qXeZCzMaNDtKOh1G2rq2EOnQZDZD';

// const GOOGLE_CLIENT_SECRET = 'your_google_client_secret';
passport.use(
    new OAuth2Strategy({
        authorizationURL: 'https://www.facebook.com/v12.0/dialog/oauth',
        tokenURL: TOKEN_URL,
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:3055', 
        profileFields: ['id', 'email', 'first_name', 'last_name'],
    },
        (accessToken, refreshToken, profile, done) => {
            try {
                console.log('accessToken', accessToken);
                console.log('profile', profile);
                const user = {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                };
                done(null, user);  
            } catch (error) {
                console.log('error', error);
            }
            
        })
);
passport.initialize();
module.exports = passport;

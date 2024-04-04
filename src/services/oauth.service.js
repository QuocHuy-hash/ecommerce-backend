const passport = require('../config/passport.config');
const Users = require('../models');

const loginWithFacebook = () => {
    passport.authenticate('facebook');
};
// Callback route sau khi đăng nhập thành công bằng Facebook
const facebookCallback = passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
});

// Controller cho việc đăng nhập bằng Google
// exports.loginWithGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback route sau khi đăng nhập thành công bằng Google
exports.googleCallback = passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login'
});



// Controller cho việc đăng xuất
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
module.exports = {
    loginWithFacebook,
    facebookCallback
}
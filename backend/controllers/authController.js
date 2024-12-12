const User = require('../models/User');
const passport = require('passport');

// Handle User Registration
exports.registerUser = async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/signup');
    }

    try {
        const user = new User({ name, email, phone, password });
        await user.save();
        req.flash('success', 'User registered successfully');
        res.redirect('/login');
    } catch (err) {
        req.flash('error', 'Error in registration');
        res.redirect('/signup');
    }
};

// Handle User Login
exports.loginUser = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
});

// Handle User Logout
exports.logoutUser = (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully');
        res.redirect('/login');
    });
};

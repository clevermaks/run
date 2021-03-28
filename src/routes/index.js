// Основные пути для сайта
const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    router.get('/', async function (req, res) {
        res.render('index', {
            title: 'Главная',
            user: getUser(req),
            message: req.flash('message')
        })
    });

    router.get('/login', async function (req, res) {
        res.render('login', {
            title: 'Войти / Регистрация',
            user: getUser(req),
            message: req.flash('message')
        })
    });
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.get('/signup', async function (req, res) {
        res.render('registration', {
            title: 'Регистрация',
            user: null,
            message: req.flash('message')
        })
    });
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}

let getUser = function (req) {
    if (_.isUndefined(req.user))
        return null;
    else
        return req.user;
}
const isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};
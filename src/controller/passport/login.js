const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/models').User;
const bCrypt = require('bcrypt');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {

            User.findOne({
                where: {
                    email: username
                }
            }).then(function (user) {
                if (!user)
                    return done(null, false, req.flash('message', '<div class="badge-warning text-center h2">Пользователь на найден</div>'));

                if (!isValidPassword(user, password))
                    return done(null, false, req.flash('message', '<div class="badge-warning text-center h2">Неверный пароль</div>')); // redirect back to login page

                return done(null, user);

            });
        })
    );

    const isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

};
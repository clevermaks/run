const login = require('./login');
const signup = require('./signup');
const User = require('../../db/models').User;

module.exports = function (passport) {

    // Passport должен иметь возможность сериализовать и десериализовать пользователей для поддержки постоянных сеансов входа в систему
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        let userFind = await User.findOne({ where: { id: id } });
        done(null, userFind);
    });

    // Настройка Passport Strategies для входа и регистрации
    login(passport);
    signup(passport);
};
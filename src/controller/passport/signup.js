const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/models').User;

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // позволяет передать обратно весь запрос на обратный вызов
        },
        function (req, username, password, done) {

            const findOrCreateUser = async function () {

                let user = await User.findOne({
                    where: {
                        email: username
                    }
                });
                if (!_.isEmpty(user)) return done(null, false, req.flash('message', '<div class="badge-warning text-center h2">Такой пользователь уже существует</div>'));

                const newUser = {
                    email: username.toLowerCase(),
                    roleId: 1,
                    password: createHash(password),
                };

                User.create(newUser).then(function (userRegister, created) {

                    if (!newUser)
                        return done(null, false);

                    if (newUser) {
                        return done(null, userRegister, req.flash('message', '<div class="badge-success text-center">' +
                            'Благодарим за регистрацию на нашем сайте!\n' +
                            'Надеемся вы найдёте то, что ищете! \n <br />' +
                            'Сделайте свой первый заказ!</div>'));
                    }
                });

            };

            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
};
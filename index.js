#!/usr/bin/env node

const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');

const initPassport = require('./src/controller/passport/init');

// Подключаем глобально модули
global._ = require('lodash');
global.moment = require('moment-timezone');
require('./global/gfuncs');

const sess = {
    secret: 'DmmAm%rNCJCWV@5qKB30',
    cookie: {},
    resave: true,
    saveUninitialized: true
};

// Загружаем настройки
try {
    require('./config/settings');
    global.settings = _.merge(settings, require('./config/settings.json'));
} catch (e) {
    console.log(e.message);
}

// Создаём проект
const express = require('express');
const app = express();

// Конфигурация проекта
global.moment.locale('ru');
global.moment.tz.setDefault('Europe/Moscow');

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(helmet());

// Configuring Passport
app.use(expressSession(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

initPassport(passport);

// Подключаем роуты
const indexRouter = require('./src/routes/index')(passport);
// const routes = require('./src/routes');
app.use('/', indexRouter);

// Обработка исключений
process.setMaxListeners(0);

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
});
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection:', p);
});

// Запуск сервера
const server = app.listen(settings.server.port);
server
    .on('listening', async () => {
        console.log(`Server started. Port: ${settings.server.port}.`);
    })
    .on('error', () => {
        console.log(`Error: port ${settings.server.port} is busy. Exit.`);
        process.exit();
    });
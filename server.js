const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

const authRouter = require('./auth/auth-router');
const middleware = require('./auth/auth-middleware')

const server = express();

const Users = require('./users/users-model');

const sesionConfig = {
    name: 'coolsession',
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require('./data/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sesionConfig));

server.use('/api/auth', authRouter);

server.use('/api/restricted', middleware.sessionAuth)

server.get('/api/users', middleware.sessionAuth, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.send(error);
        });
});


module.exports = server;
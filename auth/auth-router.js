const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    const hash = bcrypt.hashSync( req.body.password, 10)
    const hashedUser = {
        username: req.body.username,
        password: hash,
    };

    Users.add(hashedUser)
        .then(savedUser => {
            res.status(201).json(savedUser);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `'Welcome ${user.username}!` })
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({ 'error logging out': err.message });
            } else {
                res.json('successfully logged out')
            }
        })
    } else {
        res.end();
    }
})

module.exports = router;
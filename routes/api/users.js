var express = require('express');

const jwtMiddleware = require('../../config/jwtMiddleware');
const login_test = require('../login_router/passport_test');
const register = require('../login_router/register');
const login = require('../login_router/login');
const auth = require('../login_router/auth');
const logout = require('../login_router/logout');

var router = express.Router();

router.get('/', login_test.test);

router.post('/register', register.register);
router.post('/login', login.login);
router.post("/auth", jwtMiddleware.jwtMiddleware, auth.auth);
router.post("/logout", jwtMiddleware.jwtMiddleware, logout.logout);
/*
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});*/

module.exports = router;
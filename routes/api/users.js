var express = require('express');
const multer = require('multer');
const path = require('path');

const jwtMiddleware = require('../../config/jwtMiddleware');
const Profile_image_upload = require('../../config/Profile_image_upload');

const login_test = require('../login_router/passport_test');
const register = require('../login_router/register');
const login = require('../login_router/login');
const auth = require('../login_router/auth');
const logout = require('../login_router/logout');
const newFriend = require('../Friend_router/newFriend');
const FriendshipView = require('../Friend_router/FriendshipView');
const Profile_image = require('../image_controller/Profile_image');

var router = express.Router();


const ok = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
          console.log('2');
          cb(null, '../../Profile_image');
      },
      filename: function (req, file, cb) {
          console.log('1');
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      }
    }),
  });

router.get('/', login_test.test);

router.post('/Profile_image_upload', function(req, res, next) {
    Profile_image.upload(req,res).then(function (file) {
        res.json(file);
    }, function (err) {
        res.status(500).send(err);
    });
});

router.post('/register', register.register);
router.post('/login', login.login);
router.post("/auth", jwtMiddleware.jwtMiddleware, auth.auth);
router.post("/logout", jwtMiddleware.jwtMiddleware, logout.logout);
router.post("/newFriend", jwtMiddleware.jwtMiddleware, newFriend.newFriend);
router.post("/FriendshipView",  jwtMiddleware.jwtMiddleware, FriendshipView.FriendshipView);



/*
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});*/

module.exports = router;
var express = require('express');

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

router.get('/', login_test.test);

router.post('/Profile_image_upload', Profile_image_upload.Profile_image_upload.single('file'),jwtMiddleware.jwtMiddleware, Profile_image.Profile_image);


router.post('/register', register.register);
router.post('/login', login.login);
router.post("/auth", jwtMiddleware.jwtMiddleware, auth.auth);
router.post("/logout", jwtMiddleware.jwtMiddleware, logout.logout);
router.post("/newFriend", jwtMiddleware.jwtMiddleware, newFriend.newFriend);
router.post("/FriendshipView",  jwtMiddleware.jwtMiddleware, FriendshipView.FriendshipView);

module.exports = router;
var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');
const jwtMiddleware = require('../../config/jwtMiddleware');

const login_test = require('../login_router/passport_test');

var router = express.Router();

router.get('/', login_test.test);

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({
                    email: "해당 이메일을 가진 사용자가 존재합니다."
                })
            } else {
                const newUser = new User({
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    token: 'null'
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // email로 회원 찾기
    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }

            // 패스워드 확인
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // 회원 비밀번호가 일치할 때
                        // JWT PAYLOAD 생성
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        // JWT 토큰 생성
                        // 7일 동안 유효
                        const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '7d' });

                        user.token = token;
                        user.save((error, user) => {
                            if (error) {
                                return res.status(400).json({ error: "something wrong"});
                            }
                            console.log("여기들어왓는데 왜 쿠키가 안만들어짐?");
                            return res.cookie("x_auth", user.token, {
                                maxAge: 1000*60*60*24*7,
                                httpOnly: true,
                            })
                                .status(200)
                                .json({ loginSuccess: true, userId: user.id, token: user.token});
                        });
                        
                    } else {
                        errors.password = "패스워드가 일치하지 않습니다.";
                        return res.status(400).json(errors);
                    }
                });
        })
});


router.post("/auth", jwtMiddleware.jwtMiddleware, async (req, res) => {
//    res.send(req.cookies.x_auth);
    res.status(200).json({
      isAuth: true,
      id: req.user.id,
      name: req.user.name,
    });
});

router.post("/logout", jwtMiddleware.jwtMiddleware, (req, res) => {

    return res.cookie("x_auth", "").json({ logoutSuccess: true });
});
/*
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});*/

module.exports = router;
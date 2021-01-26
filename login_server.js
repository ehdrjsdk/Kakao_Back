/*
@author jae kyeong <kang7145471@naver.com>
@version 0.0.1
@file 카카오톡 클론코딩 메인 파일입니다.
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

const app = express();
const users = require('./routes/api/users');
const cookieParser = require('cookie-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("몽고 DB가 연결되었습니다."))
    .catch(err => console.log(err));

require('./config/passport')(passport);

app.use('/api/users', users);

app.listen(5000, (req, res) => {
    console.log("서버 실행중..");
});
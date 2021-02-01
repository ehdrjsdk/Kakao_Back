/** 
 * @author jae kyeong <kang7145471@naver.com>
 * @version 0.0.1
 * @file 카카오톡 클론코딩 로그인 메인 파일입니다.
*/
/** @constant app {express} node.js express를 사용하기 위해 필요한 기초적인 앱 상수입니다. */
/** @constant users {Router} 로그인과 관련된 라우팅 시스템 연결 위치 상수입니다. */
/** @constant cookieParser {function} 쿠키를 사용하고 쿠키안에서 어떤일이 일어나는지에 대해 알기위해만든 상수입니다. */
/** 
 * @constant db {string} Mongo DB에 연결하기 위해 만든 상수입니다. 
 * @throws Mongo DB에 연결하지 못한다면 콘솔에 로그를 리턴힙니다.
*/

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const images = require('./routes/api/images');
const cookieParser = require('cookie-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("몽고 DB가 연결되었습니다."))
    .catch(err => console.log(err));

app.use('/api/images', images);

app.listen(4000, (req, res) => {
    console.log("서버 실행중..");
});
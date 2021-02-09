/**
 * 최초 로그인을 하기위해서 불러오는 모듈
 * @module login
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const keys = require('../../config/keys');

function login(req, res)
{
    /**
     * <pre>
     * login.js를 불러올때 최초로 불러올 수 있도록 만들어 놓은 함수로써 
     * 입력받은 email을 가지고해당하는 회원이 있는지 확인후 없다면 에러메세지 출력
     * 존재한다면 패스워드 확인을 위한 bcryptchecker함수로 넘겨준다.
     * <pre>
     * @function login
     * 
     * @requires User
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * @returns null
     * @throws 해당하는 회원이 존재하지 않습니다.
     */
    /** @constant email {string} 입력받은 이메일 주소 */
    /** @constant password {string} 입력받은 비밀번호 */

    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    // email로 회원 찾기
    User.findOne({email})
        .then(user => {
            console.log(user);
            if(!user){
                errors.email = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            bcryptchecker(password, user, res);
        });
}

function bcryptchecker(password, user, res)
{
    /**
     * <pre>
     * bcrypt방식으로 암호화된 password를 쉽게 복호화하여
     * 상호 비교할 수 있도록 해주는 함수로써 패스워드가 일치하지 않는다면 에러출력
     * 일치한다면 jwt토큰을 만들기위한 tokenmaker함수를 불러온다.
     * </pre>
     * @function bcryptchecker
     * 
     * @requires bcryptjs
     * 
     * @param {string} password login에서 넘겨준 password정보
     * @param {string} user login에서 넘겨준 user정보
     * @param {*} res
     *
     * @returns null
     * @throws 패스워드가 일치하지 않습니다.
     */
    bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                tokenmaker(payload,user,res);
            } else {
                errors = "패스워드가 일치하지 않습니다.";
                return res.status(400).json(errors);
            }
        });
}

function tokenmaker(payload,user,res)
{
   /**
     * <pre>
     * 7일동안 유지되는 jwt토큰을 제작하고 서버에 저장
     * jwt토큰을 또한 쿠키에 저장함으로써 유저클라이언트에서 상호간에 소통이 가능하도록 함
     * Mongo DB에 저장하는 과정에서 문제가 생기게 된다면 에러구문을 출력할 수 있도록하였음
     * </pre>
     * 
     * @function tokenmaker
     * 
     * @requires jsonwebtoken
     * @requires keys
     * 
     * @param {*} payload user의 id와 name을 가지고있는 변수 
     * @param {string} user Login에서 넘겨준 user정보
     * @param {*} res
     * 
     * @return 쿠키를 만들어서 클라이언트 단에 token값을 저장시킴 저장된 토큰값은 7일간 저장
     * @throws someting worng
     */
    /** @constant token 7일간 유효한 jwt를 저장하여 사용함 */
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '7d' });

    user.profile_image_filename = null;
    user.token = token;
    console.log(token);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({ error: error});
        }
        console.log("여기들어왓는데 왜 쿠키가 안만들어짐?");
        return res.cookie("x_auth", user.token, {
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
        })
            .status(200)
            .json({ loginSuccess: true, userId: user.id, token: user.token});
    });
}

module.exports.login = login;
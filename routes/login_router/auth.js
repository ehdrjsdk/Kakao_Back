const { jwtMiddleware } = require("../../config/jwtMiddleware");
const { db } = require("../../models/User");

function auth(req, res)
{
    /**
     * <pre>
    * 쿠키에 저장된 사용자의 jwt를 비교분석하여 맞다면 사용자에 대한 정보를 json형식으로 되돌려줄 수있도록 하는 함수이다. 
    * 출력 하는 정보 : isAuth, user.id, user.name
    * </pre>
    * @function auth
    * @name auth
    */
//  res.send(req.cookies.x_auth);
    res.status(200).json({
        isAuth: true,
        id: req.user.id,
        name: req.user.name,
    });
}

module.exports.auth = auth;

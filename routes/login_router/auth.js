/**
 * 로그인된 사용자의 jwt를 비교분석하여 맞다면 사용자에 대한 정보를 json형식으로 되돌려줄 수있도록 하는 함수
 * @class
 * @param {*} req 
 * @param {*} res 
 */

function auth(req, res)
{
//  res.send(req.cookies.x_auth);
    res.status(200).json({
        isAuth: true,
        id: req.user.id,
        name: req.user.name,
    });
}

module.exports.auth = auth;

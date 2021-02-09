/** @module jwtMiddleware */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('./keys');

const jwtMiddleware = (req, res, next) => {
  /**
   * <pre>
   * 쿠키에서 넘어오는 암호화된 jwt토큰을 확인하고 해당하는 유저가 있다면
   * 해당 유저에대한 정보를 돌려주는 역할을 하는 미들웨어로써 코딩을 하였다.
   * 
   * @function jwtMiddleware
   * 
   * 
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * 
   * @returns null
   * @throws 1. token을 decode 하는 데 실패 했습니다. 2. DB에서 찾는 도중 오류가 발생했습니다. 3. token에 해당하는 유저가 없습니다.
   * 
   * </pre>
   */

   /** @var {Document} token 쿠키에 있는 jwt값을 가지는 변수 */
    var token = req.cookies.x_auth;
    console.log(token);
      
    jwt.verify(token, keys.secretOrKey, (error, decoded) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "token을 decode하는 데 실패 했습니다." });
      }
      User.findOne({ id: decoded.UserId }, (error, user) => {
        if (error) {
          return res.json({ error: "DB에서 찾는 도중 오류가 발생했습니다" });
        }
        if (!user) {
          return res
            .status(404)
            .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" });
        }
        if (user) {
          req.token = token;
          req.user = user;

        }
        next();
      });
    });
  };

  module.exports.jwtMiddleware = jwtMiddleware;
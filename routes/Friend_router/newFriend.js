/** @module newFriend */

const User = require('../../models/User');

function newFriend(req, res)
{
    /**
     * <pre>
     * 친구 추가 기능을 위해서 쿠키에 존재하는 토큰을 확인하고 해당하는 유저에 대해서
     * 입력받은 이메일을 통해 실제로 있는 유저인지 찾아주고 입력받은 유저를 저장할 수 있도록
     * 저장 함수를 실행 시킬수 있도록 함
     * </pre>
     * 
     * @function newFriend
     * 
     * @param {*} req
     * @param {*} res
     * 
     * @requires User
     * 
     * @returns null
     * @throws 해당하는 회원이 존재하지 않습니다.
     */

     /** @constant {string} Friend_Email 친구추가하고자 하는 입력받은 이메일을 받아들임 */
     /** @constant {string} User_id 현재 유저의 정보가 담긴 id를 저장하고자 생성함 */

    const Friend_Email = req.body.friend_email;
    const User_id = req.user.id;

    User.findOne({email : Friend_Email})
        .then(user => {
            if(!user){
                console.log(user);
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            var payload = {
                id: user.id
            };
            saveNewfriend(payload, User_id, res)
        });
    
}

function saveNewfriend(payload, User_id, res)
{
    /**
     * <pre>
     * 친구 추가 하고자 하는 유저의 id값을 friendship 배열에 추가함으로써 친구추가를 
     * 성공적으로 save할수 있도록 만들어주는 저장 함수
     * </pre>
     * 
     * @function saveNewfriend
     * 
     * @param {Document} payload 친구 추가할 유저의 id를 저장하고 넘어오는 변수
     * @param {string} User_id 현재 newFriend모듈을 실행시킨 유저의 id를 저장하고 있는 변수
     * @param {*} res
     * 
     * @requires User
     * 
     * @returns addSuccess : true, userid, userFreiendship
     * @throws 해당하는 회원이 존재하지 않습니다.
     */
    User.findOne({ _id : User_id})
        .then(user => {
            if(!user){
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            user.friendship.push(payload.id);
            user.save((error, user) => {
                if(error) {
                    return res.status(400).json({ error : "something wrong"});
                }
                console.log("회원이 존재하고 세이브 한번 해볼래");
                return res.json({ addSuccess : true, userID : user.id, userFriendship : user.friendship});
            });
        }); 
}

module.exports.newFriend = newFriend;
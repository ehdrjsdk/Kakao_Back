/** @module FriendshipView */

const User = require("../../models/User");

function FriendshipView(req, res)
{
    /**
     * <pre>
     * 처음 로그인을 하고 접속하였을대 보여지는 화면에서 나의 친구들 정보를 알 수 있도록
     * 친구들의 정보를 쉽게 회원에게 줄 수 있도록 설정해둔 프로그램 내용
     * friendship에 존재하는 id값을 이름으로 출력하여준다.
     * </pre>
     * 
     * @function FriendshipView
     * 
     * @param {*} req
     * @param {*} res
     * 
     * @requires User
     * 
     * @returns name : friendship에 일치하는 id값
     * @throws 해당하는 회원이 존재하지 않습니다.
     */

    /** @constant {Array} Friend_id 현재 유저의  friendship정보를 받아오는 변수*/
    /** @var {Array} Merge_Friend_Name 친구 이름을 합쳐서 리턴해주는 변수 */


    const Friend_id = req.user.friendship;
    var Merge_Friend_Name = new Array();

    for(var i=0;i<Friend_id.length;i++) {

        User.findOne({ _id : Friend_id[i] })
        .then(user => {
            if(!user){
                console.log(user);
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            Merge_Friend_Name.push(user.name);
            if(i==Merge_Friend_Name.length)
            {
                return res.status(200).json({name : Merge_Friend_Name}); 
            }
        });
    }
}

module.exports.FriendshipView = FriendshipView;
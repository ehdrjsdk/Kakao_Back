
const User = require('../../models/User');

function newFriend(req, res)
{

    const Friend_Email = req.body.friend_email;
    const User_id = req.user.id;
    
    User.findOne({Friend_Email})
        .then(user => {
            if(!user){
                errors.email = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            saveNewfriend(payload, User_id, res)
        });
    
}

function saveNewfriend(payload, User_id, res)
{
    User.findOne({User_id})
        .then(user => {
            if(!user){
                errors.id = "해당하는 회원이 존재하지 않습니다.";
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
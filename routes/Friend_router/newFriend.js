
const User = require('../../models/User');

function newFriend(req, res)
{

    const Friend_Email = req.body.friend_email;
    const User_id = req.user.id;
    console.log(User_id);
    console.log(Friend_Email);
    User.findOne({email : Friend_Email})
        .then(user => {
            if(!user){
                console.log(user);
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            console.log(User_id);
            saveNewfriend(payload, User_id, res)
        });
    
}

function saveNewfriend(payload, User_id, res)
{
    User.findOne({ _id : User_id})
        .then(user => {
            if(!user){
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            console.log(user);
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
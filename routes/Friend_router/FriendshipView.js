const User = require("../../models/User");

function FriendshipView(req, res)
{
    const Friend_id = req.body.frendship;
    const Merge_Friend_Name;

    User.findOne({_id : Friend_id})
        .then(user => {
            if(!user){
                console.log(user);
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            Merge_Friend_Name.push(user.name);
            console.log(Merge_Friend_Name);
        })
    
    return res.status(200).json({name : Merge_Friend_Name});
}


module.exports.FriendshipView = FriendshipView;
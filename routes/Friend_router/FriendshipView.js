const User = require("../../models/User");

function FriendshipView(req, res)
{
    const Friend_id = req.user.friendship;
    var Merge_Friend_Name = new Array();

    console.log(Friend_id.length);
    for(var i=0;i<Friend_id.length;i++) {

        console.log(i,Merge_Friend_Name);
        User.findOne({ _id : Friend_id[i] })
        .then(user => {
            if(!user){
                console.log(user);
                errors = "해당하는 회원이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            Merge_Friend_Name.push(user.name);
        });

    }
/*
    if(i==Merge_Friend_Name.length)
    {
        return res.status(200).json({name : Merge_Friend_Name}); 
    }
*/
    console.log(Merge_Friend_Name);   
}


module.exports.FriendshipView = FriendshipView;
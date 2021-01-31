
function FriendshipView(req, res)
{
    res.status(200).json({
        Friendship : res.user.friendship,
    });
}

module.exports.FriendshipView = FriendshipView;
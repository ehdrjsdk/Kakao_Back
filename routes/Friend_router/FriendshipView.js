
function FriendshipView(req, res)
{
    res.status(200).json({
        friendship : req.user.friendship,
    });
}

module.exports.FriendshipView = FriendshipView;
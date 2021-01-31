
function Friendship(req, res)
{
    res.status(200).json({
        Friendship : res.user.friendship,
    });
}

module.exports.Friendship = Friendship;

function auth(req, res)
{
//  res.send(req.cookies.x_auth);
    res.status(200).json({
        isAuth: true,
        id: req.user.id,
        name: req.user.name,
    });
}

module.exports.auth = auth;

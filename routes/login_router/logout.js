const { db } = require("../../models/User");

function logout(req, res)
{
    return res.cookie("x_auth", "").json({ logoutSuccess: true });
}

module.exports.logout = logout;
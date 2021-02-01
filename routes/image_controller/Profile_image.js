
function Profile_image(req, res)
{
    console.log(req.user.name);
    console.log(req.file);
}

module.exports.Profile_image = Profile_image;
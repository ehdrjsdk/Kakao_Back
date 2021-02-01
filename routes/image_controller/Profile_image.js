const Profile_image_Schema = require('../../models/Profile_image_Scheama');
const User = require('../../models/User');

function Profile_image(req, res)
{
    const newProfile_image = new Profile_image_Schema({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
    });

    newProfile_image.save();

    res.json(req.file);

    saveProfileImageName(req, res);

}

function saveProfileImageName(req, res)
{
    req.user.profile_image_filename = req.file.filename;
    req.user.save();
}

module.exports.Profile_image = Profile_image;
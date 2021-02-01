const Profile_image_Schema = require('../../models/Profile_image_Scheama');

function Profile_image(req, res)
{
    const newProfile_image = new Profile_image_Schema({
        fileldname: req.file.fileldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
    });

    newProfile_image.save();

    console.log(req.file);
}

module.exports.Profile_image = Profile_image;
var path = require('path');

function Profile_image_opener(req,res)
{    
    console.log(__dirname + '/../../Profile_image/'+ req.body.filename)
    res.status(200).sendFile(path.resolve('Profile_image/'+ req.body.filename));
}

module.exports.Profile_image_opener = Profile_image_opener;
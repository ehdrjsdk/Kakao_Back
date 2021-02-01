function Profile_image_opener(req,res)
{    
    console.log(__dirname + '/../../Profile_image/'+ req.body.filename)
    res.status(200).sendFile(__dirname + '/../../Profile_image/'+ req.body.filename);
}

module.exports.Profile_image_opener = Profile_image_opener;
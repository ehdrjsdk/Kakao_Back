/**@module Profile_image_opener */

var path = require('path');

function Profile_image_opener(req, res)
{    
    /**
     * <pre>
     * 프로필 파일 이미지를 불러오기 위해서 서버에 존재하는 이미지의 이름을 입력받아
     * 프로필 이미지를 expresss의 sendFile기능을 이용하여 filename형식으로 받아온
     * 이름을 통해 이미지를 출력한다.
     * 
     * @function  Profile_image_opener
     * 
     * @param {*} req
     * @param {*} res
     * 
     * @requires  path
     * 
     * @returns Profile_image/ + filename
     * @throws null
     * 
     */
    
    console.log(__dirname + '/../../Profile_image/'+ req.body.filename)
    res.status(200).sendFile(path.resolve('Profile_image/'+ req.body.filename));
}

module.exports.Profile_image_opener = Profile_image_opener;
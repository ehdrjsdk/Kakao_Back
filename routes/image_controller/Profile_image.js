/** @module Profile_image */

const Profile_image_Schema = require('../../models/Profile_image_Schema');

function Profile_image(req, res)
{
    /** 
     * <pre>
     * 프로필 이미지에 대한 정보를 저장하기 위해 file에대한 정보를 DB스키마에 저장하고
     * fieldname, originalname, encoding, mimetype, destination, filename, path, size를
     * 저장하고 이미지를 세이브 한후에 그 유저에 대한 이미지를 갱신하기위해 파일을 넣는다.
     * </pre>
     * 
     * @function Profile_image
     * 
     * @param {*} req
     * @param {*} res
     * 
     * @requires Profile_image_Schema
     * 
     * @returns file정보
     * @throws null
     * 
     */

    console.log(req.file.fieldname);
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

    saveProfileImageName(req);

}

function saveProfileImageName(req)
{
    /**
     * <pre>
     * 로그인된 유저 정보에 이미지 파일이름을 저장하기위한 함수
     * </pre>
     * 
     * @function saveProfileImageName
     * 
     * @param {*} req
     * 
     * @returns null
     * @throws null
     * 
     */
    req.user.profile_image_filename = req.file.filename;
    req.user.save();
}

module.exports.Profile_image = Profile_image;
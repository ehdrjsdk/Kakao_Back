/** @module Profile_image_Schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * <pre>
 * fieldname, originalname, encoding, mimetype, filename, path, size를
 * 저장할 수 있게 Schema설정을 해주는 구문
 * </pre>
 * @constant Profile_image_Schema
 */

const Profile_image_Schema = new Schema({
    fieldname: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    encoding : {
        type: String,
        required: true
    },
    mimetype : {
        type: String,
        required: true
    },
    filename : {
        type: String,
        required: true
    },
    path :  {
        type : String,
        required: true
    },
    size :  {
        type : Number,
        required:  true
    },
});

module.exports = ProfileimageSchema = mongoose.model('Profile_image', Profile_image_Schema);
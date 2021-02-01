/** @module Profile_image_Schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * <pre>
 * email, password, name, token의 type과 존재한다는것을 어디서나 알수있게 해주는
 * Schema
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
        type: Array,
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
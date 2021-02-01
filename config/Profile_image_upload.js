/** @module Profile_image_upload */

const multer = require('multer');
const path = require('path');

const Profile_image_upload = multer({

  storage: multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('2');
        cb(null, __dirname + '../../../Profile_image/');
    },
    filename: function (req, file, cb) {
        console.log('1');
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
  
});

module.exports.Profile_image_upload = Profile_image_upload;
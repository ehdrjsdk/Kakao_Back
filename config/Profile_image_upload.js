/** @module Profile_image_upload */

const multer = require('multer');
const path = require('path');

const Profile_image_upload = multer({
/**
 * <pre>
 * 프로필 파일을 업로드 하기위해서 multer를 사용해 DB에 저장할 수 있도록 해주는 코드
 * 파일의 이름을 날짜와 파일이름을 통해 랜덤한 형식으로 변환하여 같은 이름의 이미지파일이
 * 들어와도 서로 겹치지 않도록 설정해주었고 이미지파일의 경로를 저장해줌
 * </pre>
 * 
 * @const Profile_image_upload
 * 
 * @requires multer
 * @requires path
 * 
 */
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      
        console.log(__dirname);
        cb(null, __dirname + '/../Profile_image/');
    },
    filename: function (req, file, cb) {
      console.log(file.originalname);
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),

});

module.exports.Profile_image_upload = Profile_image_upload;
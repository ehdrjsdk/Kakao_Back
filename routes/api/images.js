var express = require('express');
var router = express.Router();

const Profile_image_opener = require('../image_controller/Profile_image_opener');

router.get('/Profile_image_opener', Profile_image_opener.Profile_image_opener);

module.exports = router;
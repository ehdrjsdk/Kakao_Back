const multer = require('multer');
const path = require('path');
const Q = require('q');
const imagePath = '../../Profile_image/';

var upload = function (req, res) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, imagePath);
      },
        filename: function (req, file, cb) {
        file.uploadedFile = {
          name: req.params.filename,
          ext: file.mimetype.split('/')[1]
        };
        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
      }
    });
  
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
      if (err) deferred.reject();
      else
      {
        deferred.resolve(req.file.uploadedFile);  
        console.log(req.file.uploadedFile);
      } 
    });
    console.log(deferred.promise);

    return deferred.promise;
  };

module.exports.upload = upload;
'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;
var uuid = require('uuid');

var FILE_FORMATS = ['jpg', 'jpeg', 'png'];

var _escape = function (cmd) {
  return '"' + cmd.replace(/(["\s'$`\\])/g,'\\$1') + '"';
};

var grafty = function (image, width, next) {
  image = _escape(image).replace(/"+/gi, '');
  width = parseInt(width, 10);

  var asciiImage = '';
  var imageFileExt;

  if (isNaN(width)) {
    next(new Error('Must specify width for image'));
    return;
  }

  if (image.indexOf(':image/') > -1) {
    image = image.replace('data:', 'inline:data:');

  } else {
    imageFileExt = image.split('.')
                        .reverse()[0]
                        .toLowerCase()
                        .replace(/["']+/gi, '')
                        .trim();

    if (FILE_FORMATS.indexOf(imageFileExt) === -1) {
      next(new Error('Invalid file extension - must be jpeg, jpg or png'));
      return;
    }
  }

  var newFile = uuid.v4() + '.jpg';

  if (process.env.NODE_ENV == 'test') {
    newFile = './test/images/' + newFile;
  } else {
    newFile = './images/' + newFile;
  }

  var createAscii = function (next) {
    var jp = spawn('jp2a', ['--width=' + width, newFile]);

    jp.stdout.on('data', function (data) {
      asciiImage += data;
    });

    jp.stderr.on('data', function (data) {
      next(data.toString());
      return;
    });

    jp.on('close', function (code) {
      if (code === 0) {
        next(null, asciiImage.toString());
      } else {
        next(new Error('Error code: ', code));
      }
      return;
    });
  };

  var cv = spawn('convert', [image, '-resize', 'x' + width, newFile]);

  cv.stdout.on('data', function (data) {
    cv.stdin.write(data);
  });

  cv.stderr.on('data', function (data) {
    next(data.toString());
    return;
  });

  cv.on('close', function (code) {
    if (code === 0) {
      createAscii(next);
    }
  });
};

module.exports = grafty;

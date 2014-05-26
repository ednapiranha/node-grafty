'use strict';

var spawn = require('child_process').spawn;
var uuid = require('uuid');
var fs = require('fs');

var FILE_FORMATS = ['jpg', 'jpeg', 'png', 'gif'];

var Grafty = function (options) {
  this.dir = options.dir || 0;
  this.width = options.width || 0;

  var self = this;

  var escape = function (cmd) {
    return '"' + cmd.replace(/(["\s'$`\\])/g,'\\$1') + '"';
  };

  if (!this.width || isNaN(parseInt(this.width, 10))) {
    throw new Error('Must specify width for image');
  }

  if (!this.dir) {
    throw new Error('Must specify a directory');
  }

  var createAscii = function (newFile, next) {
    var asciiImage = '';
    var jp = spawn('jp2a', ['--width=' + self.width, newFile]);

    jp.stdout.on('data', function (data) {
      asciiImage += data;
    });

    jp.stderr.on('data', function (data) {
      next(data.toString());
      return;
    });

    jp.on('close', function (code) {
      if (code === 0) {
        fs.unlink(newFile);
        next(null, asciiImage.toString());
      } else {
        next(new Error('Error code: ', code));
      }
      return;
    });
  };

  this.convert = function (image, next) {
    if (!this.width || isNaN(parseInt(this.width, 10))) {
      next(new Error('Must specify width for image'));
      return;
    }

    image = escape(image).replace(/"+/gi, '');

    if (image.indexOf(':image/') > -1) {
      image = image.replace('data:', 'inline:data:');

    } else {
      var imageFileExt = image.split('.')
                              .reverse()[0]
                              .toLowerCase()
                              .trim();

      if (FILE_FORMATS.indexOf(imageFileExt) === -1) {
        next(new Error('Invalid file extension - must be jpeg, jpg, gif or png'));
        return;
      }
    }

    var newFile = this.dir + '/' + uuid.v4() + '.jpg';
    var cv = spawn('convert', [image, '-resize', 'x' + this.width, newFile]);

    cv.stdout.on('data', function (data) {
      cv.stdin.write(data);
    });

    cv.stderr.on('data', function (data) {
      next(data.toString());
      return;
    });

    cv.on('close', function (code) {
      if (code === 0) {
        createAscii(newFile, next);
      }
    });
  };
};

module.exports = Grafty;

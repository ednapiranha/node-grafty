'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');

var Grafty = require('../main');
var grafty = new Grafty({
  width: 30
});

var invalidBase64Img = 'data:image/png;base64,iVB';

describe('grafty', function () {
  it('should generate a valid image by local file', function (done) {
    grafty.convert('test/test.png', function (err, r) {
      should.not.exist(err);
      should.exist(r);
      console.log(r);
      done();
    });
  });

  it('should escape illegal characters', function (done) {
    grafty.convert("`echo 1.jpg", function (err) {
      should.exist(err);
      done();
    });
  });

  it('should error on an invalid data uri', function (done) {
    grafty.convert(invalidBase64Img, function (err) {
      should.exist(err);
      done();
    });
  });

  it('should error for an invalid width', function (done) {
    grafty.width = false;
    grafty.convert('test/photo.jpg', function (err, r) {
      should.exist(err);
      err.toString().should.equal('Error: Must specify width for image');
      grafty.width = 10;
      done();
    });
  });

  it('should error for an invalid image extension', function (done) {
    grafty.convert('test/photo.tiff', function (err, r) {
      should.exist(err);
      err.toString().should.equal('Error: Invalid file extension - must be jpeg, jpg, gif or png');
      done();
    });
  });
});

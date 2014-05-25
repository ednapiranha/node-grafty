'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var child = require('child_process');

var Grafty = require('../main');
var grafty = new Grafty({
  width: 30,
  dir: 'test/images'
});

var base64Img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0EwNDMyMDhEQzZGMTFFMzg3OUE4OTUwMDRFOEZCRTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0EwNDMyMDdEQzZGMTFFMzg3OUE4OTUwMDRFOEZCRTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJDRjkxMzcxRjI5QTA1MDdENTYyRUZEQjM3QTE5OTU4RCIgc3RSZWY6ZG9jdW1lbnRJRD0iQ0Y5MTM3MUYyOUEwNTA3RDU2MkVGREIzN0ExOTk1OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5E54iiAAAABlBMVEXGv6+AMSoZmgcUAAAC3UlEQVR42tyZC24DMQhEZ+5/6apN1sbYYNjFUdSoqpSm8cvwMxAw/MD9x3dB8H+U/FL+SDxqLoFhivVVPrkP+AQEn4EQVQyOP8NfkQyu19vYY5ntaXtFf6YyJTSeNOxdCKdUkTKFiFqIltKKxW0IDcjlMFmRjijRZe8uhEslSzc/UrKkLAu4d1p72TBJsHoglA+WSwYp3lX0oESJf9/cd0+qIGNVFiVXRhgSr9tpShbyyoMkBWlTca7lQccn7rj2K05BOmzfUjKU3PEvgBBUDWHzB9loDGZ8nPE+VcZkzGCJZnO+rlW530EYJIAaI32zVRLBkEZjsNESNJcUgcURF+eZT95HmcnmahlbSq+i2zoomq29Elo3hjjKuLQvOTulrhzaLS0oC03QJ1xFrswTLKssPIhro55GKwS0b4zomCGUrSYoJwQOUQyjEqaVtA8oRKC7GqPnpybYg1znSkHSVOgBNYczELu02L3QpYzhC42RHeU6MAwlQ6r1G8RLfMYh6hqE/sRWs97iPwbpJ8tkdwcPYVhFgTV9WEpcc/WyME1aXnWn7Btii6RMSzT0DJFZya6QISVkeBhfe8Nui0RPEiOsrAXP8R3TsiNmspxPYGTHRkq6q1+U3vi8s0hGPlpUqfte1aGuhPsIi0Xx5uZ8tDWmUz17dIWXGFmP9Og0ps6sRxw2TINlXR9R8tApu8HUiC9WQaAU8ZASkBgboBPmGnrAxGomEXfjCiC4xLrteNn8FlIgmplhnOFdBpw8EVPhqTyh7K4HUKXjrepSHcLrol9xru7MF3dkjbnUKuAchL2Pra+SEJ1y2zBWU/qUb69KUaNkXDZNi6MKJYCaOFVpeUwB56G2BxnLIKtBFqx0ijWSB/ekqa5vXV2cJcNtn5iriuICOW1i5wntvrlWnbj4EvmAEr3K5SlIi+OjkOtmqfKJ+9XKcSU8r8Sd0KqUXGrIDyg5Dakbgv6Jkh8BBgAEGRmzq23wdAAAAABJRU5ErkJggg==';
var invalidBase64Img = 'data:image/png;base64,iVB';

describe('grafty', function () {
  after(function () {
    child.exec('rm -rf ./test/images/*.jpg');
  });

  it('should generate a valid image by local file', function (done) {
    grafty.convert('test/test.png', function (err, r) {
      should.not.exist(err);
      should.exist(r);
      console.log(r);
      done();
    });
  });

  it('should generate a valid image by data uri', function (done) {
    grafty.convert(base64Img, function (err, r) {
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

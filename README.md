# grafty

Converts images to ascii art.

## Installation

Install imagemagick and jp2a, typically:

    brew install jp2a imagemagick

Or

    apt-get install jp2a imagemagick

## Usage

    var Grafty = require('grafty');

    var grafty = new Grafty({
      width: 30,
      dir: 'images'
    });

    grafty('photo.png', function (err, result) {
      console.log(result);
    });

## Tests

    npm test

# grafty

Converts images to ascii art.

## Installation

Install imagemagick and jp2a, typically:

    brew install jp2a imagemagick

Or

    apt-get install jp2a imagemagick

## Usage

var grafty = require('grafty');

grafty('photo.png', 100, function (err, result) {
  console.log(result);
});

## Tests

    npm test

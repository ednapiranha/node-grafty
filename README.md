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
      dir: '/tmp'
    });

    grafty.convert('photo.png', function (err, result) {
      console.log(result);
    });

Note: `dir` defaults to /tmp but if you are on Windows, you should change this to your proper /tmp directory.

![image](https://raw.githubusercontent.com/ednapiranha/node-grafty/master/test/test.png)

becomes

![image](https://raw.githubusercontent.com/ednapiranha/node-grafty/master/test/result.jpg)

## Tests

    npm test

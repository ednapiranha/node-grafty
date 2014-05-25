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

![image](https://raw.githubusercontent.com/ednapiranha/node-grafty/master/test/test.png)

becomes

    '''''''''''cxOOOOOOO00OOOOOOOO
    '''''''''',oOOOOOkkkOOOOkxkkdo
    ''';cllccclx0OO00kdxOkxol::;,,
    ;coxOOOOOOOOOxdddxkOOd:'''''''
    xOOOOOOO00Okoc:;;;coxkd:,'''''
    kOOOOOOOkkxdc;;,,,,,;cooc,''''
    oO0OOkxolool:;;,,,;,',;ldc,'''
    lkO00Oko::c:,,,''''''',cl:,,',
    :dkOOOOkl;,,,''''''''',;:,,,,,
    ;codkkOOd;'''''''''''',,''''''
    ;:cloxkOx:''''''''''''''',''''
    :ccccdkOOx:'''''''''''''''''''
    ;:;,,;lxkxl,''''''''''''''''''
    ,,''',;lol:'''''''''''''''''''
    '''''',;:;,'''''''''''''''''''

## Tests

    npm test

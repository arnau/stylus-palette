# Stylus Palette

Stylus functions to get colors by name.

## Build status

![Build Status](https://travis-ci.org/arnau/stylus-palette.svg?branch=master)

## Installation

    $ npm install stylus-palette


## Usage

The `palette(object)` function recieves an object where each key is a palette
name and its value the palette composed by a {colorName, value} pairs.

    # server.js

    var connect = require('connect');
    var stylus = require('stylus');
    var palette = require('stylus-palette');
    var data = require(__dirname + '/palettes.json');

    var server = connect();

    function compile(str, path) {
      return stylus(str)
        .set('filename', path)
        .use(palette(data));
    }

    server.use(stylus.middleware({
      src: __dirname,
      compile: compile
    }));


    # palettes.json

    {
      "intense": {
        "scream": "#E80068",
        "error": "#D60000",
        "warning": "#FFCC00"
      },
      "soft": {
        "smell": "#FFB89C",
        "warning": "#FFE49C"
      }
    }

In the stylus file you'll have access to `palette()` and `palette-*()`
functions.

    # foo.styl

    .error {
      background-color: palette(intense, error);
    }

Or the equivalent

    .error {
      background-color: palette-intense(error);
    }


## Contributors

* [Arnau Siches](https://github.com/arnau)


## License

Arnau Siches under the [MIT License](https://github.com/arnau/stylus-palette/blob/master/LICENSE).

var path = require('path');
var stylus = require('stylus');

var fn = stylus.functions;
var nodes = stylus.nodes;
var utils = stylus.utils;

exports = module.exports = plugin;

/**
 * Library version.
 */
exports.version = require(path.join(__dirname, '../package.json')).version;

/**
 * Stylus path.
 */
exports.path = __dirname;

/**
 * Return the plugin callback for stylus.
 *
 * @return {Function}
 * @api public
 */
function plugin(palettes) {
  /**
   * Attempt to parse color. Copied from Stylus source code.
   *
   * @param {String} str
   * @return {RGBA}
   * @api private
   */
  var parseColor = function parseColor (str) {
    if (str.substr(0,1) === '#') {
      // Handle color shorthands (like #abc)
      var shorthand = str.length === 4,
          m = str.match(shorthand ? /\w/g : /\w{2}/g);

      if (!m) return;
      m = m.map(function(s) { return parseInt(shorthand ? s+s : s, 16) });
      return new nodes.RGBA(m[0],m[1],m[2],1);
    }
    else if (str.substr(0,3) === 'rgb'){
      var m = str.match(/([0-9]*\.?[0-9]+)/g);
      if (!m) return;
      m = m.map(function(s){return parseFloat(s, 10)});
      return new nodes.RGBA(m[0], m[1], m[2], m[3] || 1);
    }
    else {
      var rgb = colors[str];
      if (!rgb) return;
      return new nodes.RGBA(rgb[0], rgb[1], rgb[2], 1);
    }
  };

  return function (style) {
    var getColor = function (paletteName, colorName) {
      var paletteName = paletteName.toString();
      var colorName = (new nodes.Literal(colorName)).toString().string;
      var color = parseColor(palettes[paletteName][colorName]);

      return color;
    };
    var getPalette = function (paletteName) {
      return function (colorName) {
        return getColor(paletteName, colorName);
      }
    };

    style.define('palette', getColor);

    // Construct custom functions for every palette
    Object.keys(palettes).forEach(function (paletteName) {
      style.define(['palette', paletteName].join('-'), getPalette(paletteName));
    });
  };
}

/*!
 * ustwo™ palette
 */
var stylus = require('stylus');
var path = require('path');
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
  return function (style) {
    // var palettes = require(path.join(__dirname, 'palette.json'));
    var getColor = function (paletteName, colorName) {
      var paletteName = paletteName.toString();
      var colorName = colorName.toString();

      return new nodes.Ident(palettes[paletteName][colorName]);
    };
    var getPalette = function (paletteName) {
      return function (colorName) {
        return getColor(paletteName, colorName);
      }
    };

    // style.include(__dirname);

    style.define('palette', getColor);

    // Construct custom functions for every palette
    Object.keys(palettes).forEach(function (paletteName) {
      style.define(['palette', paletteName].join('-'), getPalette(paletteName));
    });
  };
}

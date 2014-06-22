var stylus = require('stylus');
var palette = require('../');
var fs = require('fs');


describe('Simple palette', function () {
  it('should be defined', function () {
    expect(palette).to.exist;
  });

  it('expect foo to be evaluated', function () {
    var data = {
      simple: {
        foo: '#FF0000'
      }
    };
    var basepath = 'test/cases';
    var path = [basepath, 'simple.styl'].join('/');
    var styl = fs.readFileSync(path, 'utf8').replace(/\r/g, '');
    var style = stylus(styl)
      .use(palette(data))
      .set('filename', path)
      .define('url', stylus.url());

    var result = style.render();

    expect(result.match(/#F00/i)).to.not.be.null;
  });

  it('expect white to be evaluated', function () {
    var data = {
      simple: {
        white: '#FFFFFF'
      }
    };
    var basepath = 'test/cases';
    var path = [basepath, 'white.styl'].join('/');
    var styl = fs.readFileSync(path, 'utf8').replace(/\r/g, '');
    var style = stylus(styl)
      .use(palette(data))
      .set('filename', path)
      .define('url', stylus.url());

    var result = style.render();

    expect(result.match(/#FFF/i)).to.not.be.null;
  });

  it('expect value to be a color', function () {
    var data = {
      simple: {
        foo: '#FF0000'
      }
    };
    var basepath = 'test/cases';
    var path = [basepath, 'operate.styl'].join('/');
    var styl = fs.readFileSync(path, 'utf8').replace(/\r/g, '');
    var style = stylus(styl)
      .use(palette(data))
      .set('filename', path)
      .define('url', stylus.url());

    var result = style.render();

    expect(result.match(/#600/)).to.not.be.null;
  });

});

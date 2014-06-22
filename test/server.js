// var stylus = require('stylus')
// var connect = require('connect')
// var jade = require('jade')
// var palette = require('../');

// var server = connect();

// var data = {
//   intense: {
//     scream: '#E80068',
//     error: '#D60000',
//     warning: '#FFCC00'
//   },
//   soft: {
//     smell: '#FFB89C',
//     warning: '#FFE49C'
//   }
// };

// function compile(str, path) {
//   return stylus(str)
//     .set('filename', path)
//     .use(palette(data));
// }

// server.use(stylus.middleware({
//   src: __dirname,
//   dest: __dirname + '/public',
//   force: true,
//   compile: compile
// }));

// server.use(connect.static(__dirname + '/public'));

// server.use(function (req, res) {
//   jade.renderFile(__dirname + '/index.jade', function (err, str) {
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     res.end(str);
//   });
// });

// server.listen(3000);
// console.log('Server listening on port 3000');

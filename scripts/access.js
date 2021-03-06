var Blog = require('../app/models/blog');
var User = require('../app/models/user');
var format = require('url').format;
var config = require('../config');


if (require.main === module) {

  var identifier = process.argv[2];

  main(identifier, function(err){

    if (err) throw err;
    
    process.exit();
  });
}

function main (handle, callback) {

  Blog.get({handle: handle}, function(err, blog){

    if (err) throw err;

    User.generateAccessToken(blog.owner, function(err, token){

      if (err) throw err;

      // The full one-time log-in link to be sent to the user
      var url = format({
        protocol: 'https',
        host: config.host,
        pathname: '/log-in',
        query: {
          token: token
        }
      });

      console.log(blog.title, blog.domain, blog.handle);
      console.log(url);
      callback();
    });
  });
}

module.exports = main;
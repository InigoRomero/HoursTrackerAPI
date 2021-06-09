// request.js
const http = require('http');

async function req(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, (res) =>{
      var body = '';

      res.on("data", function(chunk) {
        body += chunk;
        resolve (body);
      });
    }).on('error', function(e){
      resolve("Got an error: ", e);
  })
});
}

module.exports = req;
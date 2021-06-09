//const req = require('./request');
const http = require('http');

async function req(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, (res) =>{
      var body = '';

      res.on("data", function(chunk) {
        body += chunk;
        resolve (JSON.parse(body));
      });
    }).on('error', function(e){
    resolve("Got an error: ", e);
  })
});
}

async function calls(url) {
  return req(url).then(res => res);
}

module.exports = calls;
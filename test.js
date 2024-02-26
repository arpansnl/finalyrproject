var request = require('request');
request('http://127.0.0.1:4000', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Print the google web page.
  }
});
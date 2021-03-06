/**
 * Created by mirekratman on 05/10/15.
 */
var http = require('http');
var url = require("url");
var querystring = require('querystring');
const PORT = 8080;

function handleRequest(request, response) {
    var urlParts = url.parse(request.url);
    var jsonString = '';
    request.on('data', function (data) {
        jsonString += data;
    });

    //http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo
    var postOptions = {
        host: 'api.geonames.org',
        port: '80',
        path: urlParts.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': jsonString.length
        }
    };

    var postRequest = http.request(postOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            response.end(chunk);
        });
    });

    postRequest.write(jsonString);
    postRequest.end();
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});
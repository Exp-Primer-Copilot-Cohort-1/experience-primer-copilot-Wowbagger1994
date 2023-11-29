//Create Web Server
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

//Create a server
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
})

//Read the comments
app.get('/listComments', function (req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

//Add Comments
app.post('/addComments', jsonParser, function (req, res) {
    // First read existing comments
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["comment" + req.body.id] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

//Delete Comments
app.delete('/deleteComments', jsonParser, function (req, res) {
    // First read existing comments
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["comment" + req.body.id];

        console.log(data);
        res.end(JSON.stringify(data));
    });
})
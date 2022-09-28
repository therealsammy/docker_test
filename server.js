var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/get-profile', function (req, res) {
    var response = res;

    MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client) {
        if (err) throw err;

        var db = client.db('user-account');
        var query = {userid: 1};
        db.collection('users').findOne(query, function(err, result) {
            if (err) throw err;
            client.close();
            response.send(result);
        });
    });
});

app.get('/dog', function (req, res){
    var img = fs.readFileSync('dog.jpg');
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img, 'binary');
});

app.listen(3000, function() {
    console.log("app listening on port 3000!");
});
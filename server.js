var express = require('express');
var app = express();
var path = require('path');
app.use("/", express.static(__dirname + '/web'));
// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/web/token.html'));
});
console.log("Server started. Port: 80")
app.listen(80);
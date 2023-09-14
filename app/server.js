var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(5001, function () {
    console.log('Example app listening on port 3000!');
});
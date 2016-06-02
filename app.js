var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 9191;
var app = express();

app.use(express.static('public'));
app.listen(port, function (err) { console.log('Running server on port ' + port); });
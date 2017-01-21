var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.get('/', function(req, res, next){
  res.render('index');
});

app.use(function(req, res){
  res.status(404).send('404 error');
});

app.listen(3000);

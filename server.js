var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.engine('hbs', exphbs({defaultLayout: 'layout.hbs'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res, next){
  res.render('index', {
    name: 'Howie Mann'
  });
});

app.get('/about', function(req, res, next){
  res.render('about', {
    people: [
      {name: 'Howie Mann', age: 23},
      {name: 'Hela Mann', age: 23},
      {name: 'Felix Mann', age: 0},
      {name: 'James Bond', age: 78}
    ]
  })
});

app.get('/person', function(req, res, next) {
  res.json({
    name: 'Howie Mann',
    age: 23,
    race: 'awesome'
  });
});

app.use(function(req, res){
  res.status(404).send('404 error');
});

app.listen(3000);

module.exports = app;

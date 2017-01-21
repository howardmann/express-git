var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var cheerio = require('cheerio');
var app = require('../server.js');

chai.use(chaiHttp);

describe('Index', function(){
  it('should load INDEX html on / GET', function(done){
    chai.request(app)
      .get('/')
      .end(function(err, res){
        var $ = cheerio.load(res.text);

        res.should.have.status(200);
        res.should.be.html;
        $('h2').text().should.equal('Hello world');
        $('p').text().should.equal('My name is: Howie Mann');
        done();
      })
  });
});

describe('About', function(){
  it('should load ABOUT html on /about GET', function(done){
    chai.request(app)
      .get('/about')
      .end(function(err, res){
        var $ = cheerio.load(res.text);
        res.should.have.status(200);
        res.should.be.html;
        $('h2').text().should.equal('About page');
        $('li').length.should.equal(4);
        $('li').eq(0).text().should.include('Howie Mann');
        $('li').eq(1).text().should.include('Hela Mann');
        $('li').eq(2).text().should.include('Felix Mann');
        $('li').eq(3).text().should.include('James Bond');
        done();
      })
  })
});

describe('Person', function(){
  it('should load PERSON json on /person GET', function(done){
    chai.request(app)
      .get('/person')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('name');
        res.body.name.equal('Howie Mann');
        res.body.should.have.property('age');
        res.body.name.equal(23);
        res.body.should.have.property('race');
        res.body.race.should.equal('awesome');
        done();
      })
  })
});

describe('Error', function(){
  it('should send 404 error on any invalid / GET', function(done){
    chai.request(app)
      .get('/fail')
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('404 error');
        done();
      });
  })
});

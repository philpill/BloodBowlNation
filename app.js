var koa = require('koa');
var route = require('koa-route');
var players = require('./controllers/players');

var app = koa();

app.use(route.get('/players', players.all));

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
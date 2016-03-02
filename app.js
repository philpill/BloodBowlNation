var app = require('koa')();

var bodyParser = require('koa-bodyparser');

var cors = require('kcors');

var router = require('./router');

var security = require('./services/security');

app.use(cors());

app.use(bodyParser());

app.use(function * (next) {

    console.log('some middleware to examine JWT here');

    var auth = this.request.header.authorization;

    var token = auth ? security.getDecodedToken(auth) : null;

    this.state.userId = token ? token.id : null;

    yield next;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// autogenerate token here

app.listen(3000);

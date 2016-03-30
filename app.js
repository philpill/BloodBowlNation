var app = require('koa')();

var bodyParser = require('koa-bodyparser');

var cors = require('kcors');

var router = require('./router');

var security = require('./services/security');

app.use(cors());

app.use(bodyParser());

app.use(function * (next) {

    this.type = 'application/json';

    var auth = this.request.header.authorization;

    var token = auth ? security.getDecodedToken(auth) : null;

    this.state.userId = token ? token.id : null;

    yield next;
});

app.use(router.publicRoutes.routes());

app.use(function * (next) {
    if (this.state.userId) {
        yield next;
    } else {
        this.status = 404;
    }
});

app.use(router.privateRoutes.routes());

app.listen(3000);

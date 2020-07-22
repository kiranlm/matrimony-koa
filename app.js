const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const initDB = require('./config/database');
const app = new Koa();

// log all events to the terminal
app.use(logger());

initDB();

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  )
);

// instantiate our new Router
const router = new Router();
const matchRouter = new Router({
  prefix: '/match',
});
// require our external routes and pass in the router
require('./routes/basic')({ router });
require('./routes/match')({ matchRouter });

// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());

app.use(matchRouter.routes());
app.use(matchRouter.allowedMethods());

// tell the server to listen to events on a specific port
const server = app.listen(5000);
module.exports = server;

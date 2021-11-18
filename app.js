const koa = require('koa')

const config = require('./lib/config')

const handlers = require('./handlers')
const controllers = require('./controllers')
const mongooseConfig = require('./lib/mongoose-config')

const app = new koa()

handlers.forEach((h) => app.use(h))

app.use(controllers.routes())
app.use(controllers.allowedMethods())

module.exports = (callback) => {
  mongooseConfig()
  app.listen(config.port, callback)
}

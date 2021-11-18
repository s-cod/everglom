const Router = require('koa-router')

const auth = require('./auth')
const user = require('./users')
const post = require('./posts')
const postLikes = require('./post-likes')
const postComments = require('./post-comments')

const router = new Router().prefix('/api')

router.use(auth, user, post, postLikes, postComments)

module.exports = router

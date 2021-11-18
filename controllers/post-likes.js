const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Post')

const router = new Router().prefix('/posts/:postId/likes')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    const post = await Post.findById(ctx.params.postId)
    if (!post) ctx.throw(404, 'Post has been not found')
    const user = ctx.state.user._id
    if (post.likes.find((l) => l._id.toString() === user.toString())) {
      ctx.throw(400, 'User already likes this post')
    }
    post.likes.unshift({ user })
    ctx.body = await post.save()
  }
)
router.delete(
  '/:likeId',
  passport.authenticate('jwt', { session: false }),
  async (ctx) => {
    const post = await Post.findById(ctx.params.postId)
    if (!post) ctx.throw(404, 'Post has not been found')
    const likesIndex = post.likes.findIndex(
      (l) => l._id.toString() === ctx.params.likeId
    )
    if (likesIndex < 0) {
      ctx.throw(404, 'Like has not been found')
    }
    post.likes.splice(likesIndex, 1)
    ctx.body = await post.save()
  }
)

module.exports = router.routes()

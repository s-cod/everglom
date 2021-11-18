module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = e.status || 500
    ctx.body = { error: e.message || 'Internal Server error' }
  }
}

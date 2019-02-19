module.exports = options => {
  return async function login (ctx, next) {
    if (ctx.request.method !== 'GET') {
      await next()
      return
    }
    if (options.whiteList.includes(ctx.request.url)) {
      await next()
      return
    }
    if (ctx.session.userId) {
      await next()
      return
    }
    await ctx.render('/session/create')
  }
}

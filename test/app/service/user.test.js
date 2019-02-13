'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/service/user.test.js', () => {

  it('should assert', async () => {
    const ctx = app.mockContext({});
    await ctx.service.user();
  })
})

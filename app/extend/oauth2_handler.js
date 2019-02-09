module.exports = app => {
  return async function (request, response) {
    console.log('authenticateHandler', request)
    return {}
  }
}

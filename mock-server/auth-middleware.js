const path = require('path')
const tokens = require(path.resolve(__dirname, './data/tokens.json'))

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const hasBearerToken = authHeader && authHeader.search("Bearer ") !== -1 && authHeader.length > 7

  if (req.method === 'OPTIONS' ) {
    res.end()
    return
  }

  if (!authHeader || !hasBearerToken) {
    res.status(401)
    res.end('Missing authentication token')
    return
  }

  const token = authHeader.replace("Bearer ", "")
  if (tokens.indexOf(token) === -1) {
    res.status(401)
    res.end('Invalid authentication token')
    return
  }

  req.token = token
  next()
}

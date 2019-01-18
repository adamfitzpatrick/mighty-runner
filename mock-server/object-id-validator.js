const uuid = require('uuid')

const setNewObjectId = (req) => {
  if (!req.body) { req.body = {} }
  req.body.id = uuid.v4()
}

const setObjectId = (req) => {
  const pathParts = req.url.split('/')
  const existingId = pathParts[pathParts.length - 1]
  req.body.id = req.body.id || existingId
}

module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    setNewObjectId(req)
  } else {
    setObjectId(req)
  }
  next()
}

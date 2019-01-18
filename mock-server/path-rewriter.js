const rewritePath = (req) => {
  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') {
    req.url = `/${req.token}${req.url}`
  } else if (req.method === 'POST') {
    req.url = `/${req.token}`
  }
}

module.exports = (req, res, next) => {
  rewritePath(req)
  next()
}

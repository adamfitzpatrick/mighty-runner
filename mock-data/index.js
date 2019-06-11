const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./data/db.json')

server.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:7001',
    'Access-Control-Allow-Methods': 'PUT,GET',
    'Access-Control-Allow-Headers': 'content-type'
  })
  next()
})
server.use(router)
server.listen(3000, () => console.log('Mock server is running'))

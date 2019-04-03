const path = require('path')
const jsonServer = require('json-server')
const express = require('express')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, './data/db.json'))

server.use(jsonServer.bodyParser)
server.use(require('./cors'))
server.use(require('./delay'))
server.use(require('./auth-middleware'))
server.use(require('./path-rewriter'))
server.use(require('./object-id-validator'))
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})

const staticServer = express()
staticServer.use(express.static(path.resolve(__dirname, './images')))
staticServer.listen(3002)

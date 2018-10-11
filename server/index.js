  "use strict"
require('dotenv').config()
const { createServer } = require('http')
const express = require('express')
const { ApolloEngine } = require('apollo-engine')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const MONGO_URL = process.env['MONGO_URL'] || `localhost:27017`
const PORT = process.env['PORT'] || 4000

mongoose.set('debug', true)
mongoose.connect(`mongodb://${MONGO_URL}`, { useNewUrlParser: true })

mongoose.connection.once('open', () => {
  console.log('Database connected!')
})

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  cacheControl: true,
  engine: false,
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  },
  formatError: error => {
    return { message: error.message, httpCode: error.extensions.code }
  },
  context: async (root) => {
    // console.log(root)
    let req = root.req
    if (root.connection) return { }
    console.log(req.headers.authorization)
    if (!req.headers) return { }
    const token = req.headers.authorization || ''
    try {
      let decoded = await jwt.verify(token.split(' ')[1], 'digihcs')
      console.log(decoded.sub)
      const user = decoded.sub
      return { user }
    } catch (err) {
      console.log(err)
    }
    return { }
  }
})

server.applyMiddleware({ app })

const engine = new ApolloEngine({
  apiKey: process.env.SERVICE_KEYS
})

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

// Call engine.listen instead of app.listen(port)
engine.listen({
  port: PORT,
  httpServer: httpServer
}, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})

engine.on('error', () => {
  console.log("There was an error starting the server or Engine.")
  // The app failed to start, we probably want to kill the server
  process.exit(1)
})

// httpServer.listen({ port: PORT }, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
// })

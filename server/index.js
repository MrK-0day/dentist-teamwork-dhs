const { createServer } = require('http')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

const MONGO_URL = process.env['MONGO_URL'] || 'localhost:27017'
// const MONGO_URL = process.env['MONGO_URL'] || 'DbAdmin:a123456@ds139884.mlab.com:39884/dentist'
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
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
  // context: async (root) => {
  //   // console.log(root)
  //   let req = root.req
  //   if (root.connection) return { }
  //   console.log(req.headers.authorization)
  //   if (!req.headers) return { }
  //   const token = req.headers.authorization || ''
  //   try {
  //     let decoded = await jwt.verify(token.split(' ')[1], 'digihcs')
  //     console.log(decoded.sub)
  //     const user = decoded.sub
  //     return { user }
  //   } catch (err) {
  //     console.log(err)
  //   }
  //   return { }
  // }
})
server.applyMiddleware({ app })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://0.0.0.0:${PORT}${server.graphqlPath}`)
})
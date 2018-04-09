import express from 'express'
import graphqlHTTP from 'express-graphql';

// SCHEMA
import schema from './schema'

// DB
import mongoose from 'mongoose'
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})

const app = express()


app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
}))

app.listen(4000, () => {
  console.log('__SERVER_RUNNING_PORT_4000__')
})

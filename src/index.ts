import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Task from './resolvers/Task'
import Category from './resolvers/Category'

async function main() {
  const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Task,
    Category
  }
  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: ({ request }) => ({
      prisma,
      request,
    }),
  })

  server.start().then(() => {
    console.log('Server is running in http://localhost:4000')
  })
}

main()

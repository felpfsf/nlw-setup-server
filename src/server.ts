import fastify from 'fastify'
import cors from '@fastify/cors'
import { habitsRoutes } from './routes/habits.routes'

const port = (process.env.PORT as unknown as number) || 3333

async function bootstrap() {
  const server = fastify({
    logger: true
  })

  server.register(cors, { origin: true })

  await server.register(habitsRoutes, { prefix: '/api/habits' })

  await server
    .listen({ port: port })
    .then(address => console.log(`Server listening on ${address}`))
    .catch(error => {
      console.log(`Error starting the server ${error}`)
      process.exit(1)
    })
}

bootstrap()

import fastify from 'fastify'
import cors from '@fastify/cors'
import { habitsRoutes } from './routes/habits.routes'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const port = (process.env.PORT as unknown as number) || 3333

async function bootstrap() {
  const server = fastify({
    logger: true
  })

  server.register(cors, { origin: true })
  
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.setErrorHandler((error, request, reply) => {
    const toSend = {
      message: 'Validation error',
      errors: JSON.parse(error.message),
      statusCode: error.statusCode || 500
    }

    reply.code(toSend.statusCode).send(toSend)
  })

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

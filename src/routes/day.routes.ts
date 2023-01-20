import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyInstance } from 'fastify/types/instance'
import { getDaysController } from '../controllers/days.controllers'
import { dayParams } from '../models/day.models'

export async function dayRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: dayParams
    },
    handler: getDaysController
  })
}

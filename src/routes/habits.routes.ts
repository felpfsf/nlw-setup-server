import { FastifyInstance } from 'fastify'
import {
  getHabits,
  postHabitsController
} from '../controllers/habits.controllers'
import { habitBody } from '../models/habits.models'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function habitsRoutes(server: FastifyInstance) {
  // Get All Habits
  server.get('/', getHabits)
  // Create habit
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/post',
    schema: {
      body: habitBody
    },
    handler: postHabitsController
  })
}

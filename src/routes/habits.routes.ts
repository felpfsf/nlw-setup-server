import { FastifyInstance } from 'fastify'
import { getHabits } from '../controllers/habits.controllers'

export async function habitsRoutes(server: FastifyInstance) {
  // Get All Habits
  server.get('/', getHabits)
}

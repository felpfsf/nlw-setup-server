import { FastifyInstance } from 'fastify'
import { getHabits } from '../controllers/habits.controllers'
import { prisma } from '../lib/prisma'

export async function habitsRoutes(server: FastifyInstance) {
  // Get All Habits
  server.get('/', getHabits)
}

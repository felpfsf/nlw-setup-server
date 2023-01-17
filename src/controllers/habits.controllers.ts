import { FastifyReply, FastifyRequest } from 'fastify'
import { findHabits } from '../middlewares/habits.services'

export async function getHabits(request: FastifyRequest, reply: FastifyReply) {
  const habits = await findHabits()
  
  return reply.status(200).send({
    message: 'Estes são os habitos registrados: ',
    habits
  })
}

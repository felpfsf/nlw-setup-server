import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { dayHabitToggle } from '../middlewares/day.services'
import { createHabit, findHabits } from '../middlewares/habits.services'
import { HabitBody, ToggleHabitParams } from '../models/habits.models'

export async function getHabits(request: FastifyRequest, reply: FastifyReply) {
  const habits = await findHabits()

  return reply.status(200).send({
    message: 'Estes são os habitos registrados: ',
    habits
  })
}

export async function postHabitsController(
  request: FastifyRequest<{ Body: HabitBody }>,
  reply: FastifyReply
) {
  const body = request.body

  try {
    const habit = await createHabit(body)
    return reply.status(201).send({
      message: 'Habito criado com sucesso!',
      habit
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(500).send({
        message: 'Erro de validação',
        error: JSON.parse(err.message)
      })
    } else if (err instanceof Error) {
      return reply.status(500).send({
        message: err.message
      })
    }
  }
}

export async function dayHabitToggleController(
  request: FastifyRequest<{ Params: ToggleHabitParams }>,
  reply: FastifyReply
) {
  const { id } = request.params

  const dayHabit = await dayHabitToggle(id)

  return reply.status(200).send({ dayHabit })
}

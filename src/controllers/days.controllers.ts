import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import {
  getCompletedHabits,
  getPossibleHabits
} from '../middlewares/day.services'
import { DayParams } from '../models/day.models'

export async function getDaysController(
  request: FastifyRequest<{ Querystring: DayParams }>,
  reply: FastifyReply
) {
  const { date } = request.query
  console.log(date, typeof date)

  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')
  console.log(parsedDate, typeof parsedDate)

  const possibleHabits = await getPossibleHabits(date, parsedDate)
  const completedHabits = await getCompletedHabits(parsedDate)

  return reply.status(200).send({
    message: 'Possíveis hábitos completados:',
    possibleHabits,
    completedHabits
  })
}

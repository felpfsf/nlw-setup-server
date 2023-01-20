import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { getPossibleHabits } from '../middlewares/day.services'
import { DayParams } from '../models/day.models'

export async function getDaysController(
  request: FastifyRequest<{ Querystring: DayParams }>,
  reply: FastifyReply
) {
  const { date } = request.query
  console.log(date, typeof date)

  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')
  console.log(weekDay)

  const resultado = await getPossibleHabits(date)


  return { resultado }
}

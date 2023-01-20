import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { DayParams } from '../models/day.models'

export async function getPossibleHabits(date: Date) {
  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')

  const possibleHabits = await prisma.habit.findMany({
    where: {
      created_at: {
        lte: date
      },
      weekDays: {
        some: {
          week_day: weekDay
        }
      }
    }
  })

  const day = await prisma.day.findFirst({
    where: {
      date: parsedDate.toDate()
    },
    include: {
      dayHabits: true
    }
  })

  const completedHabits = day?.dayHabits.map(dayHabit => {
    return dayHabit.habit_id
  })

  return { possibleHabits, completedHabits }
}

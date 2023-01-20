import { Dayjs } from 'dayjs'
import { prisma } from '../lib/prisma'

export async function getPossibleHabits(date: Date, parsedDate: Dayjs) {
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

  return possibleHabits
}

export async function getCompletedHabits(parsedDate: Dayjs) {
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

  return completedHabits
}

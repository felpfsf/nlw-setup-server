import dayjs, { Dayjs } from 'dayjs'
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

export async function dayHabitToggle(id: string) {
  const today = dayjs().startOf('day').toDate()

  let day = await prisma.day.findUnique({
    where: {
      date: today
    }
  })

  if (!day) {
    day = await prisma.day.create({
      data: {
        date: today
      }
    })
  }

  const dayHabit = await prisma.dayHabit.findUnique({
    where: {
      day_id_habit_id: {
        day_id: day.id,
        habit_id: id
      }
    }
  })

  if (dayHabit) {
    await prisma.dayHabit.delete({
      where: {
        id: dayHabit.id
      }
    })
  } else {
    await prisma.dayHabit.create({
      data: {
        day_id: day.id,
        habit_id: id
      }
    })
  }
}

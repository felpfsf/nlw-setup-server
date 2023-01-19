import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { HabitBody } from '../models/habits.models'

export async function createHabit(input: HabitBody) {
  const { title, weekDays } = input

  // método startOf('day')
  const today = dayjs().startOf('day').toDate()

  const habit = await prisma.habit.create({
    data: {
      title: title,
      created_at: today,
      weekDays: {
        create: weekDays.map(weekDay => {
          return {
            week_day: weekDay
          }
        })
      }
    }
  })

  return habit
}

export async function findHabits() {
  return await prisma.habit.findMany({
    select: {
      title: true,
      created_at: true
    }
  })
}

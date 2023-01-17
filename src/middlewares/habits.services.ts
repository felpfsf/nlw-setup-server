import { prisma } from '../lib/prisma'

export async function findHabits() {
  return await prisma.habit.findMany({
    select: {
      title: true,
      createdAt: true
    }
  })
}

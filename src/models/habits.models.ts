import { z } from 'zod'

export const habitBody = z.object({
  title: z.string().min(1, 'O titulo do habito é obrigatório'),
  weekDays: z.array(z.number().min(0).max(6))
})

export type HabitBody = z.infer<typeof habitBody>

export const toggleHabitParams = z.object({
  id: z.string().uuid()
})

export type ToggleHabitParams = z.infer<typeof toggleHabitParams>

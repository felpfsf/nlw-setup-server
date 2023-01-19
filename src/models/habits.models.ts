import { z } from 'zod'

export const habitBody = z.object({
  title: z.string().min(1, 'O titulo do habito é obrigatório'),
  weekDays: z.array(z.number().min(0).max(6))
})

export type HabitBody = z.infer<typeof habitBody>

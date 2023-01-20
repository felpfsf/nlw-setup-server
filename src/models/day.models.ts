import { z } from 'zod'

export const dayParams = z.object({
  date: z.coerce.date()
})

export type DayParams = z.infer<typeof dayParams>

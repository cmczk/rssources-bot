import { z } from 'zod'

export const Rssource = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  tag: z.string().min(1).startsWith('#'),
})

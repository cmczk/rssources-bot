import { z } from 'zod'

export const Rssource = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string(),
  tag: z.string(),
})

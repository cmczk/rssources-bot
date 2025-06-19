import { z } from 'zod'

const Resource = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  tag: z.string().min(1).startsWith('#'),
})

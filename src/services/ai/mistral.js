import { Mistral } from '@mistralai/mistralai'

const mistralApiKey = process.env.MISTRAL_API_KEY

if (!mistralApiKey) {
  console.error('MISTRAL_API_KEY is not avalable.')
  process.exit(1)
}

const client = new Mistral({ apiKey: mistralApiKey })

const chatResponse = await client.chat.parse({
  model: 'ministral-8b-latest',
  messages: [
    {
      role: 'system',
      content: 'Extract the books information.',
    },
    {
      role: 'user',
      content: "I recently read 'To Kill a Mockingbird' by Harper Lee.",
    },
  ],
  responseFormat: Book,
  maxTokens: 256,
  temperature: 0,
})

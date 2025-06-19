import { Mistral } from '@mistralai/mistralai'
import { Rssource } from './rssource.js'

const mistralApiKey = process.env.MISTRAL_API_KEY

if (!mistralApiKey) {
  console.error('MISTRAL_API_KEY is not avalable.')
  process.exit(1)
}

const client = new Mistral({ apiKey: mistralApiKey })

/**
 * @param {string} message
 * @returns {Rssource}
 */
export const parseMessageToRssource = async (message) => {
  const response = await client.chat.parse({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'system',
        content: 'Extract the resource information from the user message.',
      },
      {
        role: 'user',
        content: message,
      },
    ],
    responseFormat: Rssource,
    maxTokens: 256,
    temperature: 0,
  })

  return response.choices[0].message.parsed
}

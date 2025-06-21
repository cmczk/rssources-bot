import 'dotenv/config'

import { Bot, GrammyError, HttpError } from 'grammy'
import { conversations, createConversation } from '@grammyjs/conversations'

import { startBot } from './commands/start.js'
import { saveRssourceConversation } from './conversations/save-rssource.js'

const botApiKey = process.env.BOT_API_KEY

if (!botApiKey) {
  console.error('BOT_API_KEY is not avalable.')
  process.exit(1)
}

const bot = new Bot(botApiKey)

bot.use(conversations())
bot.use(createConversation(saveRssourceConversation))

bot.command('start', (ctx) => {
  startBot(ctx)
})

bot.command('save_rssource', async (ctx) => {
  await ctx.conversation.enter('saveRssourceConversation')
})

bot.on('message', async (ctx) => {
  ctx.reply("I don't know what you mean...")
})

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling an update ${ctx.update.update_id}:`)
  const e = err.error
  if (e instanceof GrammyError) {
    console.error('Request error:', e.description)
  } else if (e instanceof HttpError) {
    console.error('Не удалось связаться с Telegram:', e)
  } else {
    console.error('Unknown error:', e)
  }
})

bot.start()

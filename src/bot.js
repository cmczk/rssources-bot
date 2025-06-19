import 'dotenv/config'
import { Bot } from 'grammy'
import { storage } from './sqlite/storage.js'

const botApiKey = process.env.BOT_API_KEY

if (!botApiKey) {
  console.error('BOT_API_KEY is not avalable')
  process.exit(1)
}

const bot = new Bot(botApiKey)

bot.command('start', (ctx) => {
  ctx.reply('Hello, world!')
})

bot.start()

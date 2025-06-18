import { Bot } from 'grammy'
import 'dotenv/config'

const bot = new Bot(process.env.BOT_API_KEY)

bot.command('start', (ctx) => {
  ctx.reply('Hello, world!')
})

bot.start()

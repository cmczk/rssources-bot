import 'dotenv/config'
import { Bot, GrammyError, HttpError } from 'grammy'
import { startBot } from './commands/start.js'
import { saveRssource } from './commands/save-rssource.js'
import { parseMessageToRssource } from './services/ai/mistral.js'

const botApiKey = process.env.BOT_API_KEY

if (!botApiKey) {
  console.error('BOT_API_KEY is not avalable.')
  process.exit(1)
}

const bot = new Bot(botApiKey)

let state = {
  addingRssource: false,
}

bot.command('start', (ctx) => {
  startBot(ctx)
})

bot.command('save_rssource', (ctx) => {
  ctx.reply('Пришлите описание ресурса, который вы хотите сохранить:')
  state.addingRssource = true
  setTimeout(() => {
    state.addingRssource = false
  }, 300_000)
})

bot.on('message', async (ctx) => {
  if (state.addingRssource) {
    const parsedRssource = await parseMessageToRssource(ctx.message.text)
    await saveRssource(ctx, parsedRssource)
    state.addingRssource = false
  } else {
    ctx.reply("I don't know what you mean...")
  }
})

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`)
  const e = err.error
  if (e instanceof GrammyError) {
    console.error('Ошибка в запросе:', e.description)
  } else if (e instanceof HttpError) {
    console.error('Не удалось связаться с Telegram:', e)
  } else {
    console.error('Неизвестная ошибка:', e)
  }
})

bot.start()

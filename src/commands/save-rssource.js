import { createRssource, getRssource } from '../sqlite/repository.js'
import { Rssource } from '../services/ai/rssource.js'

/**
 * @param {import('grammy').Context} ctx
 * @param {Rssource} rssource
 */
export const saveRssource = async (ctx, rssource) => {
  console.log(rssource.url)
  console.log(ctx.from.id)

  const exRssource = getRssource.get(ctx.from.id, rssource.url)

  console.log(`EXRSS: ${exRssource.title}`)

  if (!!exRssource) {
    await ctx.reply('Вы уже сохраняли такой ресурс.')
    return
  }

  const newRssource = createRssource.get(
    ctx.from.id,
    rssource.title,
    rssource.description,
    rssource.tag,
    rssource.url,
  )

  console.log(`NEWRSS: ${exRssource}`)

  await ctx.reply(`Ресурс ${newRssource.title} сохранён!`)
}

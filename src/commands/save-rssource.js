import { createRssource, getRssource } from '../sqlite/repository.js'

/**
 * @param {import('grammy').Context} ctx
 * @param {import('../services/ai/rssource.js').Rssource} rssource
 */
export const saveRssource = async (ctx, rssource) => {
  const exRssource = getRssource.get(ctx.from.id, rssource.url)

  if (exRssource) {
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

  await ctx.reply(`Ресурс ${newRssource.title} сохранён!`)
}

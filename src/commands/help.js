const helpMessage = `some help message`

/**
 * @param {import('grammy').Context} ctx
 */
export const help = async (ctx) => {
  await ctx.reply(helpMessage)
}

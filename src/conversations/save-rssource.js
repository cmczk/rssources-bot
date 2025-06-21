import { parseMessageToRssource } from '../services/ai/mistral.js'
import { saveRssource } from '../commands/save-rssource.js'

/**
 * @param {import('@grammyjs/conversations').Conversation} conversation
 * @param {import('grammy').Context} ctx
 */
export const saveRssourceConversation = async (conversation, ctx) => {
  await ctx.reply('Пришлите описание ресурса, который вы хотите сохранить:')
  const { message } = await conversation.waitFor('message:text')
  const parsedRssource = await parseMessageToRssource(message.text)
  await saveRssource(ctx, parsedRssource)
}

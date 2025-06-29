import { createUser, getUserByTgId } from '../sqlite/repository.js'

const welcomeMessage = `Hello, user!`

/**
 * @param {import('grammy').Context} ctx
 */
const sayHi = async (ctx) => {
  await ctx.reply(welcomeMessage)
}

/**
 * @param {import('grammy').Context} ctx
 */
const saveUser = (ctx) => {
  const newUser = createUser.get(ctx.from.id, ctx.from.username)

  return { username: newUser.username }
}

/**
 * @param {import('grammy').Context} ctx
 */
export const startBot = async (ctx) => {
  const exUsername = getUserByTgId.get(ctx.from.id)

  if (exUsername) {
    await ctx.reply('Вы уже зарегистрированы!')
    return
  }

  sayHi(ctx)
  const { username } = saveUser(ctx)
  await ctx.reply(`You have been saved, ${username}!`)
}

import { Message } from 'discord.js'
import { queue } from '@/utils/queue'

export function resume(message: Message) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue || !serverQueue.player) {
    message.reply('Não há nenhuma música pausada que eu possa retomar!')
    return
  }
  serverQueue.player.unpause()
  message.reply('Música retomada!')
}

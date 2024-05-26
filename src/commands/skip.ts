import { Message } from 'discord.js'
import { queue } from '@/utils/queue'

export function skip(message: Message) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) {
    message.reply('Não há nenhuma música tocando que eu possa pular!')
    return
  }
  serverQueue.player.stop()
  message.reply('Música pulada!')
}

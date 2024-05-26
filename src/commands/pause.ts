import { Message } from 'discord.js'
import { queue } from '@/utils/queue'

export function pause(message: Message) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue || !serverQueue.player) {
    message.reply('Não há nenhuma música tocando que eu possa pausar!')
    return
  }
  serverQueue.player.pause()
  message.reply('Música pausada!')
}

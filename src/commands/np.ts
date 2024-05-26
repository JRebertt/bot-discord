import { Message } from 'discord.js'
import { queue } from '@/utils/queue'

export function np(message: Message) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue || !serverQueue.songs[0]) {
    message.reply('Não há nenhuma música tocando no momento.')
    return
  }
  message.channel.send(`Tocando agora: **${serverQueue.songs[0].title}**`)
}

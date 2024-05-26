import { Message } from 'discord.js'
import { queue } from '@/utils/queue'

export function queueCommand(message: Message) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) {
    message.reply('Não há músicas na fila.')
    return
  }
  const songList = serverQueue.songs
    .map((song, index) => `${index + 1}. ${song.title}`)
    .join('\n')
  message.channel.send(`Fila de músicas:\n${songList}`)
}

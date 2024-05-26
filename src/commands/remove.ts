import { Message } from 'discord.js'
import { queue } from '@/utils/queue'

export function remove(message: Message, args: string[]) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) {
    message.reply('Não há músicas na fila para remover!')
    return
  }
  const songIndex = parseInt(args[0]) - 1

  if (songIndex < 0 || songIndex >= serverQueue.songs.length) {
    message.reply('Índice de música inválido.')
    return
  }
  const removedSong = serverQueue.songs.splice(songIndex, 1)
  message.channel.send(`Música removida: ${removedSong[0].title}`)
}

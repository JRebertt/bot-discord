import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
} from '@discordjs/voice'
import ytdl from 'ytdl-core'
import { queue } from '@/utils/queue'
import { ServerQueue, type QueueItem } from '@/@types/types'
import logger from '@/utils/logger'

export async function playSong(guildId: string, song: QueueItem) {
  const serverQueue: ServerQueue = queue.get(guildId)
  if (!serverQueue) {
    logger.error(`ServerQueue not found for guild ${guildId}`)
    return
  }

  if (!song) {
    logger.info('No song left in queue, disconnecting...')
    serverQueue.connection.disconnect()
    queue.delete(guildId)
    return
  }

  try {
    const stream = ytdl(song.url, { filter: 'audioonly' })
    const resource = createAudioResource(stream)
    const player = createAudioPlayer()

    serverQueue.connection.subscribe(player)
    serverQueue.player = player
    player.play(resource)

    player.on(AudioPlayerStatus.Playing, () => {
      logger.info(`Playing ${song.title}`)
      serverQueue.textChannel.send(`Tocando agora: **${song.title}**`)
    })

    player.on(AudioPlayerStatus.Idle, () => {
      if (!serverQueue.loop) {
        serverQueue.songs.shift()
      }
      playSong(guildId, serverQueue.songs[0])
    })

    player.on('error', (error) => {
      logger.error(`Erro no player de áudio: ${error}`)
      serverQueue.songs.shift()
      playSong(guildId, serverQueue.songs[0])
    })
  } catch (error) {
    logger.error(`Erro ao tentar tocar a música: ${error}`)
    serverQueue.textChannel.send('Ocorreu um erro ao tentar tocar a música!')
    serverQueue.connection.disconnect()
    queue.delete(guildId)
  }
}

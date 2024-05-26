import { Message, ChannelType } from 'discord.js'
import ytdl from 'ytdl-core'
import { queue } from '@/utils/queue'
import { joinVoiceChannel, VoiceConnection } from '@discordjs/voice'
import { playSong } from '@/utils/play-song'
import { QueueItem, ServerQueue } from '@/@types/types'

export async function play(message: Message, args: string[]) {
  if (!message.guild) {
    message.reply('Este comando só pode ser usado em servidores.')
    return
  }

  const url = args[0]

  if (!ytdl.validateURL(url)) {
    message.reply('URL inválida!')
    return
  }

  const songInfo = await ytdl.getInfo(url)
  const song: QueueItem = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  }

  if (!message.member) {
    message.reply('Não foi possível determinar o membro do guild.')
    return
  }

  const voiceChannel = message.member.voice.channel
  if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
    message.reply(
      'Você precisa estar em um canal de voz para usar este comando!',
    )
    return
  }

  const serverQueue = queue.get(message.guild.id)

  if (!serverQueue) {
    const queueConstruct: ServerQueue = {
      textChannel: message.channel as any,
      voiceChannel,
      connection: {} as VoiceConnection, // Inicialização temporária
      songs: [],
      player: null,
      loop: false,
    }

    queue.set(message.guild.id, queueConstruct)
    queueConstruct.songs.push(song)

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: false,
      })

      queueConstruct.connection = connection
      playSong(message.guild.id, queueConstruct.songs[0])
    } catch (err) {
      console.error(`Não consegui entrar no canal de voz: ${err}`)
      queue.delete(message.guild.id)
    }
  } else {
    serverQueue.songs.push(song)
    message.channel.send(`${song.title} foi adicionada à fila!`)
  }
}

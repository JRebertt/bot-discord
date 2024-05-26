import { VoiceConnection } from '@discordjs/voice'
import { TextChannel, VoiceChannel } from 'discord.js'

export interface QueueItem {
  title: string
  url: string
}

export interface ServerQueue {
  textChannel: TextChannel
  voiceChannel: VoiceChannel
  connection: VoiceConnection
  songs: QueueItem[]
  player: any
  loop: boolean
}

export interface ExtendedMessage extends Message {
  guild: Guild
}

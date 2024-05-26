import { Message, Client } from 'discord.js'
import { play } from '@/commands/play'
import { skip } from '@/commands/skip'
import { pause } from '@/commands/pause'
import { resume } from '@/commands/resume'
import { queueCommand } from '@/commands/queue'
import { remove } from '@/commands/remove'
import { np } from '@/commands/np'
import { help } from '@/commands/help'

export function handleCommand(message: Message, client: Client) {
  const prefix = '!' // Prefixo dos comandos
  if (!message.content.startsWith(prefix)) return

  const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)
  switch (command) {
    case 'play':
      play(message, args)
      break
    case 'skip':
      skip(message)
      break
    case 'pause':
      pause(message)
      break
    case 'resume':
      resume(message)
      break
    case 'queue':
      queueCommand(message)
      break
    case 'remove':
      remove(message, args)
      break
    case 'np':
      np(message)
      break
    case 'help':
      help(message)
      break
    default:
      message.reply(
        'Comando não reconhecido. Use `!help` para ver a lista de comandos.',
      )
  }
}

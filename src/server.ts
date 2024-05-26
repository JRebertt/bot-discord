import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import sodium from 'libsodium-wrappers'
import { handleCommand } from '@/utils/handle-command'

config()
;(async () => {
  await sodium.ready
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  })

  client.once('ready', () => {
    console.log('Bot is online!')
  })

  client.on('messageCreate', (message) => {
    if (!message.guild) return
    handleCommand(message, client)
  })

  client.login(process.env.DISCORD_TOKEN)
})()

import { Message } from 'discord.js'

export function help(message: Message) {
  message.channel.send(`
**Comandos disponíveis:**
\`!play <URL do YouTube>\` - Adiciona uma música à fila e começa a tocá-la.
\`!skip\` - Pula a música atual e toca a próxima na fila.
\`!pause\` - Pausa a música atual.
\`!resume\` - Retoma a música pausada.
\`!queue\` - Mostra a fila de músicas.
\`!remove <número>\` - Remove a música especificada da fila.
\`!np\` - Mostra a música que está tocando no momento.
\`!help\` - Mostra esta mensagem de ajuda.
  `)
}

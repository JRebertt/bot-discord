
# Discord Music Bot

Este é um bot de música para Discord que permite tocar músicas a partir de URLs do YouTube diretamente no seu canal de voz do Discord. Ele suporta uma fila de espera, comandos para controlar a reprodução (pausar, retomar, pular) e exibir a música atual.

## Recursos

- Tocar músicas do YouTube
- Fila de músicas
- Pausar e retomar a música
- Pular a música atual
- Mostrar a música que está tocando no momento
- Mostrar a fila de músicas
- Remover músicas da fila

## Pré-requisitos

- Node.js v16 ou superior
- NPM ou Yarn
- Uma conta no Discord e um servidor onde você tenha permissões para adicionar bots
- Token do bot do Discord (você pode obter isso criando um aplicativo no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications))

## Configuração

### 1. Clone o Repositório

```sh
git clone https://github.com/seu-usuario/discord-music-bot.git
cd discord-music-bot
```

### 2. Instale as Dependências

```sh
npm install
```
ou
```sh
yarn install
```

### 3. Configure o Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e adicione o token do seu bot do Discord:

```env
DISCORD_TOKEN=seu-token-do-discord
```

### 4. Estrutura do Projeto

```
discord-music-bot/
├── src/
│   ├── @types/
│   │   ├── type.d.ts
│   ├── commands/
│   │   ├── help.ts
│   │   ├── play.ts
│   │   ├── queue.ts
│   │   ├── remove.ts
│   │   ├── skip.ts
│   │   ├── pause.ts
│   │   ├── resume.ts
│   ├── utils/
│   │   ├── handle-command.ts
│   │   ├── logger.ts
│   │   ├── play-song.ts
│   │   ├── queue.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
```

### 5. Execute o Bot

```sh
npm run start:dev
```

## Comandos

- `!play <URL do YouTube>` - Adiciona uma música à fila e começa a tocá-la.
- `!skip` - Pula a música atual e toca a próxima na fila.
- `!pause` - Pausa a música atual.
- `!resume` - Retoma a música pausada.
- `!queue` - Mostra a fila de músicas.
- `!remove <número>` - Remove a música especificada da fila.
- `!np` - Mostra a música que está tocando no momento.
- `!help` - Mostra esta mensagem de ajuda.

## Contribuindo

Sinta-se à vontade para enviar pull requests ou abrir issues para sugerir melhorias ou relatar problemas.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.

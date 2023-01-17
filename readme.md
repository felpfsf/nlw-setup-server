# NLW Setup

## Como clonar e executar esse projeto

### Até o momento esse projeto está em desenvolvimento

**Git Clone**
**`git clone https://github.com/felpfsf/nlw-setup-server.git`**

No diretório execute o comando **`yarn`** para instalar as dependências.

Para executar digite o comando **`yarn dev`**. O servidor irá iniciar na porta `3333`, se quiser alterar a porta vá em server.ts e altere o valor da variável port para a porta desejada

`const port = (process.env.PORT as unknown as number) || 3333`

## Anotações Gerais

### Iniciando o projeto

- [ ] **`yarn init`** - Comando utilizado para iniciar o projeto, adicionar nome do projeto, descrição, autor e demais informações que no final gera um arquivo `package.json`.
- [ ] **`yarn add typescript -D`** - Instala o typescript como dependência.
- [ ] **`yarn tsc --init`** - Cria um arquivo de configuração para o typescript, alterar o `target` para `ES2020`.
- [ ] **`yarn add tsx -D`** - Executa a instação do tsx, ele iriá monitorar as ações o executará o live-reload do server. Para que isso ocorra, após a instalação vá em `package.json` criar um objeto `scripts` e dentro dele adicionar a linha `"dev":"tsx watch src/server.ts"`.
yarn add fastify - Fastify é uma alternativa mais rápida ao express.
yarn add @fastify/cors - Configurações de CORS para executar o projeto. Para habilitar durante o desenvolvimento deste projeto é necessário seguir os passos:

```ts
import Fastify from 'fastify'
import cors from '@fastify/cors'

async function bootstrap(){
  const server = Fastify()
  
  await server.register(cors, {
    origin:true
    // Ou origin: https://exemplo.com
    // Nesse caso apenas requests realizadas deste domínio serão aceitas
  })
  
  await server.listen({port: 3333})
}

bootstrap()
```

- [ ] **`yarn add prisma -D`** - Instala o ORM Prisma
- [ ] **`yarn prisma init --datasource-provider postgresql`** - cria um banco de dados, no caso optei pelo uso de `postgresql` mas o prisma suporta muitos outros não relacionais e relacionais. Para postgres é necessário fornecer uma string de conexão como está no arquivo `.env.example`, serviços como [Railway](https://railway.app/), [Render](https://render.com/) e [Supabase](https://supabase.com/) possuem hospedagem gratuita de BD postgresql.
- [ ] **`yarn prisma db push`** - uma alternativa ao `prisma migrate dev`, esse comando manda as alterações diretamente sem criar uma `migration`
- [ ] **`yarn add @prisma/client`** - PrismaClient é o querybuilder necessário para fazer a conexão e executar ações de leitura e escrita no bd.

Para utilizar o Prisma Client é necessário importá-lo e criar uma nova instância dele, aqui ele se encontra em um arquivo separado para manter o código mais organizado:
*lib/prisma.ts*

```js
import { PrismaClient } from '@prisma/client'

// Exporta a função para ser utilizada em qualquer arquivo, assim evita a necessidade de repetir esse código todas as vezes
export const prisma = new PrismaClient({
  log: ['query']
  // Aqui exibe o log de todas as query(create, select, update, delete...) executadas
})
```
Utilizando o prisma/client:
*routes.ts*

```js
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function habitsRoutes(server: FastifyInstance) {
  // Get All Habits
  server.get('/', async(request, reply)=>{
    // O prisma usado aqui é o mesmo criado em lib,
    // Dispensando a necessidade de executar todos aqueles comandos
    // tornando o código mais legível e de fácil manutenção
    const habits = await prisma.habit.findMany()
    return habits
  })
}
```

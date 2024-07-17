import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getDiscordUserProfile } from '../backend/src/data/discord';
import fastifyCors from '@fastify/cors';

const fastify: FastifyInstance = Fastify({ logger: true });

// Configuração do CORS
fastify.register(fastifyCors, {
  origin: true,  // Permite todos os origens
  methods: ['GET', 'POST'],  // Métodos permitidos
});

// Rota para obter o perfil do Discord
fastify.get('/profile', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const profile = await getDiscordUserProfile();
    reply.send(profile);
  } catch (error) {
    reply.status(500).send({ error: (error as Error).message });
  }
});

// Rota de boas-vindas
fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: 'Bem-vindo ao servidor Fastify!' });
});

// Inicia o servidor
fastify.listen(4400, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🟢 | Server running!! \n➜  Local:  ${address}`);
});

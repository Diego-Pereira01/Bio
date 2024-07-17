import fetch, { Response } from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_USER_ID = process.env.DISCORD_USER_ID as string;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;

if (!DISCORD_USER_ID || !DISCORD_BOT_TOKEN) {
  throw new Error('DISCORD_USER_ID ou DISCORD_BOT_TOKEN não está definido nas variáveis de ambiente.');
}

interface DiscordProfile {
  id: string;
  avatar: string;
  banner?: string;
  [key: string]: any;
}

export async function getDiscordUserProfile(): Promise<DiscordProfile> {
  try {
    const response: Response = await fetch(`https://discord.com/api/v9/users/${DISCORD_USER_ID}`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuário do Discord: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    if (typeof data === 'object' && data !== null && 'id' in data && 'avatar' in data) {
      return data as DiscordProfile;
    } else {
      throw new Error('Dados do perfil do Discord inválidos');
    }
  } catch (error) {
    throw new Error(`Erro ao buscar perfil do Discord: ${(error as Error).message}`);
  }
}

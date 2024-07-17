import axios from 'axios';

export const fetchDiscordProfile = async () => {
  try {
    const response = await axios.get('http://localhost:4400/profile'); // Atualize o URL conforme necessário
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil do Discord:', error);
    throw error;
  }
};

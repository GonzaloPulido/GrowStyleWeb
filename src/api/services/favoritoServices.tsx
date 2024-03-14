import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3001';

interface Favorito {
  id: number;
  id_usuario: number;
  id_producto: number;
}

export const getAllFavoritos = async (): Promise<Favorito[]> => {
  try {
    const response: AxiosResponse<Favorito[]> = await axios.get(`${API_URL}/favorito`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los favoritos:', error);
    throw error;
  }
};

export const getFavoritosByUserId = async (userId: number): Promise<Favorito[]> => {
  try {
    const response: AxiosResponse<Favorito[]> = await axios.get(`${API_URL}/favorito/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener favoritos por ID de usuario:', error);
    throw error;
  }
};

interface FavoritoResponse {
  message: string,
  id: string
}

export const createFavorito = async (favoritoData: Favorito): Promise<FavoritoResponse> => {
  try {
    const response : AxiosResponse<FavoritoResponse> = await axios.post(`${API_URL}/favorito/create`, favoritoData);
    return response.data
    
  } catch (error) {
    console.error('Error al crear favorito:', error);
    throw error;
  }
};

export const updateFavorito = async (favoritoId: number, favoritoData: Partial<Favorito>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/favorito/${favoritoId}`, favoritoData);
  } catch (error) {
    console.error('Error al actualizar favorito:', error);
    throw error;
  }
};

export const deleteFavorito = async (favoritoId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/favorito/${favoritoId}`);
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    throw error;
  }
};

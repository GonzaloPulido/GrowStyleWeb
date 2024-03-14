import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3001';

interface User {
  id?: any;
  rol?: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  contrasenya: string;
  calle?: string;
  numero?: string;
  ciudad?: string;
  codigo_postal?: string;
  provincia?: string;
}

interface UsuarioResponse {
  id?: any;
  rol?: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  contrasenya: string;
  calle?: string;
  numero?: string;
  ciudad?: string;
  codigo_postal?: string;
  provincia?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
};

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${API_URL}/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

export const createUser = async (userData: User): Promise<UsuarioResponse> => {
  try {
    const response : AxiosResponse<UsuarioResponse> = await axios.post(`${API_URL}/usuarios/create`, userData);
    return response.data
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/usuarios/${userId}`, userData);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/usuarios/${userId}`);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

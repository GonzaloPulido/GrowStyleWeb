import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Actualiza la URL base según tu configuración

export const getAllImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/images`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todas las imágenes:', error);
    throw error;
  }
};

export const getImageById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la imagen con ID ${id}:`, error);
    throw error;
  }
};

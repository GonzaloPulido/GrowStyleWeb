import axios from 'axios';

// const BASE_URL = 'http://localhost:3001'; (DESPLIEGUE LOCAL)
const BASE_URL = 'https://growstylebackend-production.up.railway.app';
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
    const response = await fetch(`${BASE_URL}/images/${id}`,{ cache: 'force-cache' });
    return response.json();
  } catch (error) {
    console.error(`Error al obtener la imagen con ID ${id}:`, error);
    throw error;
  }
};

export const getImageById2 = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la imagen con ID ${id}:`, error);
    throw error;
  }
};

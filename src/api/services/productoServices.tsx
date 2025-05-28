import axios, { AxiosResponse } from 'axios';


// const API_URL = 'http://localhost:3001'; (DESPLIEGUE LOCAL)
const API_URL = 'https://growstylebackend-production.up.railway.app';
// Interfaz para el producto
interface Product {
  id: number;
  nombre: string;
  precio: number;
  precio_descuento: number;
  color: string;
  imagen: string;
  talla_xs: number;
  talla_s: number;
  talla_m: number;
  talla_l: number;
  talla_xl: number;
  talla_xxl: number;
}

// Función para obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    throw error;
  }
};

// Función para obtener un producto por ID
export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await axios.get(`${API_URL}/productos/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const createProduct = async (productData: Product): Promise<void> => {
  try {
    await axios.post(`${API_URL}/productos/create`, productData);
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Función para actualizar un producto existente
export const updateProduct = async (productId: number, productData: Partial<Product>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/productos/${productId}`, productData);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// Función para eliminar un producto
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/productos/${productId}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};
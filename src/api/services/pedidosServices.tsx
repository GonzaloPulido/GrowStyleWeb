import axios, { AxiosResponse } from 'axios';

// const API_URL = 'http://localhost:3001'; (DESPLIEGUE LOCAL)
const API_URL = 'https://growstylebackend-production.up.railway.app';
interface Pedido {
  id: number;
  id_usuario: number;
  status: number;
  fecha: Date;
}

export const getAllPedidos = async (): Promise<Pedido[]> => {
  try {
    const response: AxiosResponse<Pedido[]> = await axios.get(`${API_URL}/pedidos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    throw error;
  }
};

export const getPedidosByUserId = async (userId: number): Promise<Pedido[]> => {
  try {
    const response: AxiosResponse<Pedido[]> = await axios.get(`${API_URL}/pedidos/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos por ID de usuario:', error);
    throw error;
  }
};

export const createPedido = async (pedidoData: Pedido): Promise<void> => {
  try {
    await axios.post(`${API_URL}/pedidos/create`, pedidoData);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

export const updatePedidoStatus = async (pedidoId: number, status: number): Promise<void> => {
  try {
    await axios.put(`${API_URL}/pedidos/${pedidoId}`, { status });
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    throw error;
  }
};

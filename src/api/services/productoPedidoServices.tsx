import axios, { AxiosResponse } from 'axios';

// const API_URL = 'http://localhost:3001';(DESPLIEGUE LOCAL)
const API_URL = 'https://growstylebackend-production.up.railway.app';
interface ProductoPedido {
  id: number;
  cantidad: number;
  talla: string;
  id_producto: number;
  id_pedido: number;
}

export const getAllProductoPedido = async (): Promise<ProductoPedido[]> => {
  try {
    const response: AxiosResponse<ProductoPedido[]> = await axios.get(`${API_URL}/productoPedido`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los productos del pedido:', error);
    throw error;
  }
};

export const getProductoPedidoByPedidoId = async (pedidoId: number): Promise<ProductoPedido[]> => {
  try {
    const response: AxiosResponse<ProductoPedido[]> = await axios.get(`${API_URL}/productoPedido/${pedidoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos del pedido por ID de pedido:', error);
    throw error;
  }
};

export const createProductoPedido = async (productoPedidoData: ProductoPedido): Promise<void> => {
  try {
    await axios.post(`${API_URL}/productoPedido/create`, productoPedidoData);
  } catch (error) {
    console.error('Error al crear producto pedido:', error);
    throw error;
  }
};

export const updateProductoPedido = async (productoPedidoId: number, productoPedidoData: Partial<ProductoPedido>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/productoPedido/${productoPedidoId}`, productoPedidoData);
  } catch (error) {
    console.error('Error al actualizar producto pedido:', error);
    throw error;
  }
};

export const deleteProductoPedido = async (productoPedidoId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/productoPedido/${productoPedidoId}`);
  } catch (error) {
    console.error('Error al eliminar producto pedido:', error);
    throw error;
  }
};

import { createProductoPedido, getAllProductoPedido, getProductoPedidoByPedidoId, updateProductoPedido } from "../services/productoPedidoServices";

interface ProductoPedido {
    id: number;
    cantidad: number;
    talla: string;
    id_producto: number;
    id_pedido: number;
  }

/* export const fetchAllProductoPedidos = async () => {
    try {
      const favs = await getAllProductoPedido();
      console.log('Todos los productoPedidos:', favs);
    } catch (error) {
      console.error('Error al obtener todos los productosPedidos:', error);
    }
}; */

export const fetchProductoPedidoByPedidoId = async (id: number) => {
    try {
      const favs = await getProductoPedidoByPedidoId(id);
      console.log('ProductoPedido by PedidoId:', favs);
    } catch (error) {
      console.error('Error al obtener el productoPedido:', error);
    }
};

export const fetchCreateProductoPedido = async (productoPedido: ProductoPedido) => {
    try {
      const favs = await createProductoPedido(productoPedido);
      console.log('ProductoPedido creado correctamente:', favs);
    } catch (error) {
      console.error('Error al crear productoPedido:', error);
    }
};

/* export const fetchUpdateProductoPedido = async (id: number, productoPedido: ProductoPedido) => {
    try {
      const favs = await updateProductoPedido(id, productoPedido);
      console.log('Pedido actualizado correctamente:', favs);
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
}; */
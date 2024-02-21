import { createPedido, getAllPedidos, getPedidosByUserId, updatePedidoStatus } from "../services/pedidosServices";

interface Pedido {
    id: number;
    id_usuario: number;
    status: number;
    fecha: Date;
}

export const fetchAllPedidos = async () => {
    try {
      const favs = await getAllPedidos();
      console.log('Todos los pedidos:', favs);
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
    }
};

export const fetchPedidoByUserId = async (id: number) => {
    try {
      const favs = await getPedidosByUserId(id);
      console.log('Pedido by UserId:', favs);
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
    }
};

export const fetchCreatePedido = async (pedido: Pedido) => {
    try {
      const favs = await createPedido(pedido);
      console.log('Pedido creado correctamente:', favs);
    } catch (error) {
      console.error('Error al crear pedido:', error);
    }
};

export const fetchUpdatePedido = async (id: number, status: number) => {
    try {
      const favs = await updatePedidoStatus(id, status);
      console.log('Pedido actualizado correctamente:', favs);
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
};
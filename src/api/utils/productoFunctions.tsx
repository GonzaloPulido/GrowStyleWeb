import { getAllProducts, getProductById } from "../services/productoServices";

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

export const fetchAllProductos = async () => {
    try {
      const prod = await getAllProducts();
      return prod
      console.log('Todos los productos:', prod);
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
    }
};

export const fetchProductById = async (id: number) => {
    try {
      const favs = await getProductById(id);
      return favs
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
};

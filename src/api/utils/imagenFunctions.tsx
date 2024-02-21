import { getAllImages, getImageById } from "../services/imageServices";

export const fetchAllImages = async () => {
    try {
      const img = await getAllImages();
      console.log('Todas las imagenes:', img);
    } catch (error) {
      console.error('Error al obtener todas las imagenes:', error);
    }
};

export const fetchImageById = async (id: string) => {
    try {
      const favs = await getImageById(id);
      console.log('Imagen by Id:', favs);
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
};
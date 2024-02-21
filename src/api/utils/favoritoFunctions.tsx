import { createFavorito, deleteFavorito, getAllFavoritos, getFavoritosByUserId, updateFavorito } from "../services/favoritoServices";

interface Favorito {
    id: number;
    id_usuario: number;
    id_producto: number;
  }

/* export const fetchAllFavorites = async () => {
    try {
      const favs = await getAllFavoritos();
      console.log('Todos los favoritos:', favs);
    } catch (error) {
      console.error('Error al obtener todos los favoritos:', error);
    }
}; */

export const fetchFavoriteByUserId = async (id: number) => {
    try {
      const favs = await getFavoritosByUserId(id);
      console.log('Favorito by UserId:', favs);
    } catch (error) {
      console.error('Error al obtener el favorito:', error);
    }
};

export const fetchCreateFavorite = async (favorito: Favorito) => {
    try {
      const favs = await createFavorito(favorito);
      console.log('Favorito creado correctamente:', favs);
    } catch (error) {
      console.error('Error al crear favorito:', error);
    }
};

/* export const fetchUpdateFavorite = async (id: number, data: Favorito) => {
    try {
      const favs = await updateFavorito(id, data);
      console.log('Favorito actualizado correctamente:', favs);
    } catch (error) {
      console.error('Error al actualizar el favorito:', error);
    }
}; */

export const fetchDeleteFavorite = async (id: number) => {
    try {
      const favs = await deleteFavorito(id);
      console.log('Favorito eliminado correctamente:');
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
    }
};







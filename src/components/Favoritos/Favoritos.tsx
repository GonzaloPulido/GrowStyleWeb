import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import Image from 'next/image'
import useAuthStore from '../../store/loginStore';
import { fetchDeleteFavorite, fetchFavoriteByUserId } from '../../api/utils/favoritoFunctions';
import { customToast } from '../../share/notifications';
import { fetchProductById } from '../../api/utils/productoFunctions';
import FavoritoPerfilComponent from '../../modules/FavoritoPerfilComponent/FavoritoPerfilComponent';

interface Producto {
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
  
interface Favorito {
id: number;
id_usuario: number;
id_producto: number;
}
const Favoritos = () => {
    const checkLogged = useAuthStore.getState().isLogged
    const myUser = useAuthStore.getState().loggedUser
    const [favoritos, setFavoritos] = useState<Favorito[]>()
    const [productos, setProductos] = useState<Producto[]>()
    const [errorAlertShown, setErrorAlertShown] = useState(false)

    const handleEliminarFavorito = async (idFavorito: number, idProducto: number) => {
        try {
            await fetchDeleteFavorite(idFavorito);
    
            const nuevosFavoritos = favoritos?.filter(fav => fav.id !== idFavorito);
            setFavoritos(nuevosFavoritos);
    
            const nuevosProductos = productos?.filter(prod => prod.id !== idProducto);
            setProductos(nuevosProductos);

            if (!errorAlertShown) {
                customToast("Producto eliminado de favoritos", {
                    type: "success",
                    position: "top-left",
                    autoClose: 3000,
                    theme: "colored",
                });
                setErrorAlertShown(true);
            }
            setErrorAlertShown(false);
    
        } catch (error) {
            console.error('Error al eliminar el favorito:', error);
        }
    };

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosList: Producto[] = [];
                if (favoritos && favoritos.length > 0) {
                    const promises = favoritos.map(async fav => {
                        const fetchedProd = await fetchProductById(fav.id_producto);
                        if (fetchedProd) {
                            productosList.push(fetchedProd);
                        }
                    });
                    await Promise.all(promises);
                    setProductos(productosList);
                } else {
                    setProductos([]);
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        }
        obtenerProductos();
    }, [favoritos]);

    useEffect( () => {
        if (checkLogged) {
          const fetchFavoritos = async () => {
            try {
              const data = await fetchFavoriteByUserId(myUser.id);
              if (data && Array.isArray(data)) {
                setFavoritos(data);
              } else {
                console.error('Error: Datos de productos no válidos.');
              }
            } catch (error) {
              console.error('Error fetching productos:', error);
            }
          };
          fetchFavoritos();
        }
      }, []);

  return (
    
    <SData>
        <SDataTitle>
            Favoritos
        </SDataTitle>
        <SFavoritos>
        {productos ? (
            productos.map( (prod) => {
                const {id, nombre, color, imagen, precio, precio_descuento} = prod
                const favorito: any = favoritos?.find(fav => fav.id_producto === id && fav.id_usuario === myUser.id);
                return(
                    <FavoritoPerfilComponent key={id} id={id} imagen={imagen} nombre={nombre} 
                    precioDescuento={precio_descuento} precio={precio} color={color}
                    onDeleteFavorito={handleEliminarFavorito}
                    idFav={favorito?.id}
                    ></FavoritoPerfilComponent>
                )
            })
        ) : (
            ""
        )}
        </SFavoritos>
    </SData>
  )
}

const SData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SDataTitle = styled.div`
  font-size: 25px;
  text-decoration: underline;
  @media (max-width: 1180px) {
    text-align: center;
  }
`

const SFavoritos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 1180px) {
    margin: auto;
  }
`


export default Favoritos
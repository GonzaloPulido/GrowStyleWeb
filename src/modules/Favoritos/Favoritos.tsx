import dynamic from "next/dynamic"
import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import close from "../../../public/icons/closeIcon.svg"
import { useEffect, useState } from "react"
import useAuthStore from "../../store/loginStore"
import { fetchDeleteFavorite, fetchFavoriteByUserId } from "../../api/utils/favoritoFunctions"
import { fetchProductById } from "../../api/utils/productoFunctions"
import FavoritoComponent from "../FavoritoComponent/FavoritoComponent"
import { customToast } from "../../share/notifications"


const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface FavProps {
    isActive: boolean,
    onClose: () => void
}

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

const Favoritos: React.FC<FavProps> = ({onClose, isActive}) => {
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
      
    return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="favoritos">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={onClose}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <STitle>Favoritos</STitle>
                            <SContainerFavorites>
                            {productos && favoritos ? (
                                productos.map( (prod) => {
                                    const {id, nombre, color, imagen, precio, precio_descuento} = prod
                                    const favorito: any = favoritos?.find(fav => fav.id_producto === id && fav.id_usuario === myUser.id);

                                    return(
                                        <FavoritoComponent key={id} id={id} imagen={imagen} nombre={nombre} 
                                        precioDescuento={precio_descuento} precio={precio} color={color}
                                        onDeleteFavorito={handleEliminarFavorito}
                                        idFav={favorito?.id}
                                        ></FavoritoComponent>
                                    )
                                })
                            ) : (
                                <SEmpty>No tienes productos en favoritos</SEmpty>
                            )}
                            </SContainerFavorites>
                        </SPopUpContainer>
                    </SShader>
                </DynamicPortal>
            )}
        </>
    )
}

const SShader = styled.div`
    width: 100%;
    height: 100%;
    //background-color: #00000077;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10000;
    top: 0;
`

const SPopUpContainer = styled.div`
    width: 30.5rem;
    height: 50rem;
    background-color: ${COLORS.backgroundWhite};
    border-bottom-left-radius: 0.375rem;
    overflow-y: auto;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    display: inline-flex;
    z-index: 2000;
    position: absolute;
    top: 0;
    right: 0;
    border-left: 0.125rem solid ${COLORS.black};
    border-bottom: 0.125rem solid ${COLORS.black};
    padding-top: 1.25rem;
    padding-bottom: 1.875rem;
`

const SCloseButton = styled.div`
    position: absolute;
    margin-left: 0.75rem;
    cursor: pointer;
    &:hover{
        transition: filter 0.2s ease-in-out;
        filter: invert(35%) sepia(43%) saturate(450%) hue-rotate(66deg) brightness(101%) contrast(94%);
    }
`

const SCloseImage = styled(Image)`
    width: 2.5rem;
    height: 2.5rem;
`

const STitle = styled.h2`
    width: 100%;
    font-size: 2.625rem;
    text-align: center;
`

const SContainerFavorites = styled.div`
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

const SEmpty = styled.h2`
    font-size: 25px;
    text-align: center;
    margin-top: 200px;
`







export default Favoritos
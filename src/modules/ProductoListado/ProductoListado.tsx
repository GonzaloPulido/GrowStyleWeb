import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import fav from '../../../public/icons/heartIcon.svg'
import noFav from '../../../public/icons/noHeartIcon.svg'
import { useRouter } from 'next/router'
import { base64topng } from '../../functions/generalFunctions'
import defaultImage from '../../../public/icons/default.png'
import useAuthStore from '../../store/loginStore'
import { customToast } from '../../share/notifications'
import { fetchCreateFavorite, fetchDeleteFavorite, fetchFavoriteByUserId } from '../../api/utils/favoritoFunctions'

interface ProductoListadoProps {
    id: number,
    imagen: string,
    nombre: string,
    precioDescuento: number,
    precio: number,
    isFav: boolean,
    favId: any
}

interface Favorito {
    id?: number
    id_usuario: number;
    id_producto: number;
  }

const ProductoListado: React.FC<ProductoListadoProps> = ({id,imagen,nombre,precioDescuento,precio,isFav,favId}) => {
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState('')
    const checkLogged = useAuthStore.getState().isLogged
    const myUser = useAuthStore.getState().loggedUser
    const [errorAlertShown, setErrorAlertShown] = useState(false)
    const [favIcon, setFavIcon] = useState(isFav)
    const [idFav, setIdFav] = useState(favId)
    
    const handleImageClick = () => {
        router.push(`/producto/${id}`);
    };

    useEffect(() => {
        const fetchImage = async () => {
          try {
            const img = await base64topng(imagen);
            setImageSrc(img);
          } catch (error) {
            console.error('Error al cargar la imagen:', error);
          }
        };
        fetchImage();
    }, []);

    const AddDeleteFavorite = async () => {
    if (checkLogged){
        if(favIcon){
            if(idFav) {
                setFavIcon(false)
                await fetchDeleteFavorite(idFav)
                setFavIcon(!favIcon)
                setIdFav(0)
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
                return
            }
        }else if (!favIcon){
        const myFavorito = {id_usuario: myUser.id, id_producto: id}
        const myResponse = await fetchCreateFavorite(myFavorito)
        setIdFav(myResponse?.id)
        setFavIcon(true)
        if (!errorAlertShown) {
            customToast("Producto añadido a favoritos", {
                type: "success",
                position: "top-left",
                autoClose: 3000,
                theme: "colored",
            });
            setErrorAlertShown(true);
        } 
        setErrorAlertShown(false);
        return
        }
    }else{
        if (!errorAlertShown) {
        customToast("Debes estar logueado", {
            type: "error",
            position: "top-left",
            autoClose: 3000,
            theme: "colored",
        });
        setErrorAlertShown(true);
    }setErrorAlertShown(false);
    }
    }

  return (
    <SProductoContainer>
        <SImagen src={ imageSrc ? imageSrc :  defaultImage.src} alt='' width={0} height={0} onClick={handleImageClick}/>
        <SInformacion>
            <SLeftContainer>
                <SName>{nombre}</SName>
                <SPrices>
                    {precioDescuento > 0  && <SDiscountPrice>{precioDescuento}€</SDiscountPrice>}
                    <SPrice className={ precioDescuento > 0 ? "noprice" : ""}>{precio}€</SPrice>
                </SPrices>
            </SLeftContainer>
            <SRightContainer>
                <SFavIcon src={favIcon ? fav : noFav} alt='' onClick={() => AddDeleteFavorite()}/>
            </SRightContainer>
        </SInformacion>
    </SProductoContainer>
  )
}

const SProductoContainer = styled.div`
    width: 350px;
    height: 600px;
    //background-color: red;
    display: flex;
    flex-direction: column;
`

const SImagen = styled(Image)`
    width: 100%;
    height: 480px;
    border: 3px solid ${COLORS.black};
    object-fit: cover;
    cursor: pointer;
`
const SInformacion = styled.div`
    border: 2px solid ${COLORS.black};
    background-color: ${COLORS.white};
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
`

const SLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const SRightContainer = styled.div`
    display: flex;
    align-items: center;
`

const SName = styled.h2`
    font-size: 25px;
`

const SPrices = styled.div`
    display: flex;
    gap: 15px;
`

const SDiscountPrice = styled.h2`
    font-size: 25px;
    color: ${COLORS.darkRed}; 
`

const SPrice = styled.h2`
    font-size: 25px;
    &.noprice {
        text-decoration: line-through;
        margin: auto;
    }
`

const SFavIcon = styled(Image)`
    width: 30px;
    height: 30px;
    margin-right: 15px;
    cursor: pointer;
`

export default ProductoListado
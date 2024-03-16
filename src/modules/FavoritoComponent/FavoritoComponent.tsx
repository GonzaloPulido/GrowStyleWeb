import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import { useRouter } from 'next/router'
import { base64topng } from '../../functions/generalFunctions'
import defaultImage from '../../../public/icons/default.png'
import trash from '../../../public/icons/trashIcon.svg'
import useAuthStore from '../../store/loginStore'

interface FavoritoComponentProps {
    id: number,
    imagen: string,
    nombre: string,
    precioDescuento: number,
    precio: number,
    color: string
    onDeleteFavorito: any
    idFav: number
}

interface Favorito {
    id?: number
    id_usuario: number;
    id_producto: number;
  }

const FavoritoComponent: React.FC<FavoritoComponentProps> = ({id,imagen,nombre,precioDescuento,precio,color, onDeleteFavorito,idFav}) => {
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState('')
    
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

    const handleEliminarClick = () => {
        onDeleteFavorito(idFav);
    };


  return (
    <SFavContainer>
        <SFavImage src={ imageSrc ? imageSrc :  defaultImage.src} alt='' width={0} height={0} onClick={handleImageClick}/>
        <SInfoContainer>
            <SNameFav>{nombre}</SNameFav>
            <SColor id={color}/>
            <SPriceContainer>
                {precioDescuento > 0 && <SPrecioDescuento>{precioDescuento}€</SPrecioDescuento>}
                <SPrecio className={ precioDescuento > 0 ? "noprice" : "price"}>{precio}€</SPrecio>
            </SPriceContainer>
        </SInfoContainer>
        <SIconsContainer>
            <STrashIcon src={trash} alt="" onClick={handleEliminarClick}/>
        </SIconsContainer>
    </SFavContainer>
  )
}

const SFavContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content:space-between;
    padding-left: 20px;
    padding-right: 20px;

`

const SInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 40%;
`

const SIconsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const SFavImage = styled(Image)`
    width: 120px;
    height: 135px;
`

const SNameFav = styled.h2`
    font-size: 25px;
`

const SColor = styled.div`
    padding: 5px;
    width: 100%;
    height: 20px;
    &#Rojo{
      border: 2px solid ${COLORS.black};
      background-color: red;
  }
  &#Azul{
      border: 2px solid ${COLORS.black};
      background-color: blue;
  }
  &#Negro{
      border: 2px solid ${COLORS.gray};
      background-color: black;
  }
  &#Verde{
      border: 2px solid ${COLORS.black};
      background-color: green;
  }
  &#Marron{
      border: 2px solid ${COLORS.black};
      background-color: brown;
  }
  &#Blanco{
      border: 2px solid ${COLORS.gray};
      background-color: white;
  }
`

const SPriceContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const SPrecioDescuento = styled.h2`
    font-size: 20px;
    color: red;
`
const SPrecio = styled.h2`
    font-size: 20px;
    &.noprice {
        text-decoration: line-through;
        
    }
    &.price {
        margin: auto;
    }
`

const STrashIcon = styled(Image)`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    &:hover{
        transition: filter 0.2s ease-in-out;
        filter: invert(35%) sepia(43%) saturate(450%) hue-rotate(66deg) brightness(101%) contrast(94%);
    }
`

export default FavoritoComponent
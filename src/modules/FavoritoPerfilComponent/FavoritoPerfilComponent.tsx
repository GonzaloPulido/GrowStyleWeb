import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../share/colors'
import { useRouter } from 'next/router'
import { base64topng } from '../../functions/generalFunctions'
import defaultImage from '../../../public/icons/default.png'
import trash from '../../../public/icons/trashIcon.svg'
import useAuthStore from '../../store/loginStore'

interface FavoritoPerfilComponentProps {
    id: number,
    imagen: string,
    nombre: string,
    precioDescuento: number,
    precio: number,
    color: string
    onDeleteFavorito: any
    idFav: number
}

const FavoritoPerfilComponent: React.FC<FavoritoPerfilComponentProps> = ({id,imagen,nombre,precioDescuento,precio,color, onDeleteFavorito,idFav}) => {
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
    <SFav>
        <SFavImage src={imageSrc ? imageSrc : defaultImage.src} alt='' width={0} height={0}/>
        <SInfoContainer>
            <SNombreFav>{nombre}</SNombreFav>
            <SDatoSFav>
                <SColor id={color}/>
                <STrashIcon src={trash} alt='' onClick={handleEliminarClick}/>
            </SDatoSFav>
            <SPriceContainer>
                <SPrecioDescuento>{precioDescuento}€</SPrecioDescuento>
                <SPrecio>{precio}€</SPrecio>
            </SPriceContainer>
        </SInfoContainer>
    </SFav>
  )
}

const SColor = styled.div`
    padding: 5px;
    width: 35%;
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
    text-decoration: line-through;
`

const SBasketIcon = styled(Image)`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    &:hover{
        transition: filter 0.2s ease-in-out;
        filter: invert(35%) sepia(43%) saturate(450%) hue-rotate(66deg) brightness(101%) contrast(94%);
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

const SFav = styled.div`
    width: 700px;
    display: flex;
    gap: 90px;
    border-bottom: 2px solid ${COLORS.gray};
    @media (max-width: 820px) {
        flex-direction: column;
        gap: 15px;
        width: 350px;
    }
`

const SFavImage = styled(Image)`
    width: 185px;
    height: 200px;
    @media (max-width: 820px) {
    align-self: center;
    }
`

const SInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
    @media (max-width: 820px) {
        align-self: center;
        gap: 30px;
    }
`

const SNombreFav = styled.h2`
    text-align: center;
    font-size: 25px;
`

const SDatoSFav = styled.div`
    display: flex;
    align-items: center;
    width: 250px;
    //gap: 70px;
    //margin-left: 50px;
    justify-content: space-between;
    @media (max-width: 820px) {
       margin: auto;
       justify-content: space-around;
       margin-bottom: 15px;
    }
`

const STalla = styled.div`
    font-size: 25px;
`


export default FavoritoPerfilComponent
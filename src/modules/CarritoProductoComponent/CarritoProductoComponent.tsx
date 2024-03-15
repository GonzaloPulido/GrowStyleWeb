import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import trash from "../../../public/icons/trashIcon.svg"
import { useEffect, useState } from "react"
import { base64topng } from "../../functions/generalFunctions"
import defaultImage from '../../../public/icons/default.png'
import router from "next/router"
import useAuthStore from "../../store/loginStore"

interface CartProps {
    productoId: number,
    productoNombre: string,
    productoColor: string,
    productoPrecio: number,
    productoPrecioDescuento: number,
    talla?: string,
    cantidad:number,
    imagen: string
    onDeleteProdCarrito: any
    aumentarCantidad: any
    disminuirCantidad: any
    carritoPadre: any
}

interface CartItem {
    cartProductId: number;
    cantidadProd: number;
    tallaProd?: string;
}

const Carrito: React.FC<CartProps> = ({productoId,productoNombre,productoColor,productoPrecio,productoPrecioDescuento,talla,
    cantidad,imagen,onDeleteProdCarrito, aumentarCantidad,disminuirCantidad,carritoPadre}) => {
    const [imageSrc, setImageSrc] = useState('')
    const myUser = useAuthStore.getState().loggedUser
    const loggedUser = useAuthStore.getState().loggedUser
    /* const [carrito, setCarrito] = useState<CartItem[]|null>(null) */

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

    /* useEffect( () => {
        if(loggedUser && myUser){
            const callCarrito = localStorage.getItem(`cart_${myUser.id}`);
            if (callCarrito) {
                const parsedCarrito: CartItem[] = JSON.parse(callCarrito);
                setCarrito(parsedCarrito);
            } else {
                setCarrito(null);
            }
        }
    }, []) */

    const handleImageClick = () => {
        router.push(`/producto/${productoId}`);
    };

    const handleEliminarProdCarrito = () => {
        onDeleteProdCarrito(carritoPadre, productoId, talla);
    };

    const handleAñadirCantidad = () => {
        aumentarCantidad(carritoPadre, productoId, talla)
    }

    const handleDisminuirCantidad = () => {
        disminuirCantidad(carritoPadre, productoId, talla)
    }


    return(
        <SCartProdContainer>
            <SCartProdImage src={ imageSrc ? imageSrc :  defaultImage.src} alt="" width={0} height={0} onClick={handleImageClick}/>
            <SInfoContainer>
                <SCartName>{productoNombre}</SCartName>
                <SModifyContainer>
                    <SColor id={productoColor}/>
                    <SSize>{talla?.toLocaleUpperCase()}</SSize>
                    <SQuantity>
                        <SAdd onClick={handleAñadirCantidad}>+</SAdd>
                        <SNumber>{cantidad}</SNumber>
                        <SSubtract onClick={handleDisminuirCantidad}>-</SSubtract>
                    </SQuantity>
                </SModifyContainer>
                
                <SPriceContainer>
                    <SFinalPrice>{productoPrecioDescuento}€</SFinalPrice>
                    <SSaleWithoutDiscount>{productoPrecio}€</SSaleWithoutDiscount>
                </SPriceContainer>
            </SInfoContainer>
            <SIconsContainer>
                <STrashIcon src={trash} alt="" onClick={handleEliminarProdCarrito}/>
            </SIconsContainer>
        </SCartProdContainer>
                                
                            
    )                          
}

const SCartProdContainer = styled.div`
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
const SCartProdImage = styled(Image)`
    width: 120px;
    height: 135px;
    cursor: pointer;
`

const SCartName = styled.h2`
    font-size: 25px;
`

const SColor = styled.div`
    padding: 5px;
    border-radius: 100%;
    width: 20px;
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

const SFinalPrice = styled.h2`
    font-size: 20px;
    color: red;
`
const SSaleWithoutDiscount = styled.h2`
    font-size: 20px;
    text-decoration: line-through;
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

const SQuantity = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50px;
    
`

const SAdd = styled.button`
    border: 0;
    background-color: ${COLORS.backgroundWhite};
    cursor: pointer;
`

const SNumber = styled.h2`
    
`

const SSubtract = styled.h2`
    cursor: pointer;
    border: 0;
    background-color: ${COLORS.backgroundWhite};
`

const SModifyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const SSize = styled.h2`
    
`

export default Carrito
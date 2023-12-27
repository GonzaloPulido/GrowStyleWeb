import dynamic from "next/dynamic"
import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import close from "../../../public/icons/closeIcon.svg"
import basket from "../../../public/icons/basketIcon.svg"
import trash from "../../../public/icons/trashIcon.svg"
import { useState } from "react"

const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface CartProps {
    isActive: boolean,
    onClose: () => void
}

const Carrito: React.FC<CartProps> = ({onClose, isActive}) => {
    let precioFinal = 0
    const incrementarPrecio = () => {
        precioFinal += 1
    }
    const decrementarPrecio = () => {
        precioFinal -= 1
    }

    const [prodCarrito, setProdCarrito] = useState([
        {id: 1, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 30,cantidad: 1 , descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 2, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 3, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 4, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 30, cantidad: 1, descuento: 0, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 5, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 6, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 30, cantidad: 1, descuento: 0, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 7, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 8, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 30, cantidad: 1, descuento: 20, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    ])

    const eliminarElemento = (id: number) => {
        console.log("Eliminando...");
        const nuevoCarrito = [...prodCarrito];
        const indice = prodCarrito.findIndex((prod) => prod.id === id);
        
        if (indice !== -1) {
            const nuevoCarritoActualizado = [...nuevoCarrito];
            nuevoCarritoActualizado.splice(indice, 1);
            setProdCarrito(nuevoCarritoActualizado);
            console.log("Elemento eliminado:", id);
        } else {
            console.error("Elemento no encontrado");
        }
    }


    return(
        <>  
            {isActive && (
                <DynamicPortal nodeID="cart">
                    <SShader>
                        <SPopUpContainer>
                            <SCloseButton onClick={onClose}>
                                <SCloseImage src={close} alt=""></SCloseImage>
                            </SCloseButton>
                            <STitle>Carrito</STitle>
                            <SContainerCart>
                            {prodCarrito.map((prod)=>{
                                console.log(prodCarrito.length);
                                if (prod.descuento > 0) {
                                    precioFinal += prod.descuento
                                }else {
                                    precioFinal += prod.precio
                                }
                                const { id, nombre, color, precio, descuento, imagen, cantidad, talla } = prod;
                                return(
                                    <SCartProdContainer>
                                        <SCartProdImage src={imagen} alt="" width={0} height={0}/>
                                        <SInfoContainer>
                                            <SCartName>{nombre}</SCartName>
                                            <SModifyContainer>
                                                <SColor id={color}/>
                                                <SSize>{talla}</SSize>
                                                <SQuantity>
                                                    <SAdd>+</SAdd>
                                                    <SNumber>{cantidad}</SNumber>
                                                    <SSubtract>-</SSubtract>
                                                </SQuantity>
                                            </SModifyContainer>
                                            
                                            <SPriceContainer>
                                                <SFinalPrice>{descuento}€</SFinalPrice>
                                                <SSaleWithoutDiscount>{precio}€</SSaleWithoutDiscount>
                                            </SPriceContainer>
                                        </SInfoContainer>
                                        <SIconsContainer>
                                            <STrashIcon src={trash} alt="" onClick={() => eliminarElemento(id)}/>
                                        </SIconsContainer>
                                    </SCartProdContainer>
                                )
                            })}
                            <SFinalPriceContainer>
                                <STitlePrice>Total: </STitlePrice>
                                <STitleNumber>{precioFinal}€</STitleNumber>
                            </SFinalPriceContainer>
                            <SBuyButton>
                                <SButtonTitle>Tramitar pedido</SButtonTitle>
                            </SBuyButton>
                            </SContainerCart>
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
    width: 32rem;
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

const SContainerCart = styled.div`
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

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
`

const SIconsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const SCartProdImage = styled(Image)`
    width: 90px;
    height: 135px;
`

const SCartName = styled.h2`
    font-size: 25px;
`

const SColor = styled.div`
    padding: 5px;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    &#rojo{
        border: 2px solid ${COLORS.black};
        background-color: red;
    }
    &#azul{
        border: 2px solid ${COLORS.black};
        background-color: blue;
    }
    &#negro{
        border: 2px solid ${COLORS.gray};
        background-color: black;
    }
    &#verde{
        border: 2px solid ${COLORS.black};
        background-color: green;
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

const SQuantity = styled.div`
    display: flex;
    justify-content: space-between;
    width: 45px;
    
`

const SAdd = styled.p`

`

const SNumber = styled.p`
    
`

const SSubtract = styled.p`

`

const SModifyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const SSize = styled.p`
    
`

const SFinalPriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
`

const STitlePrice = styled.h2`
    font-size: 25px;
`

const STitleNumber = styled.h2`
    font-size: 25px;
`

const SBuyButton = styled.div`
    width: 28rem;
    align-self: center;
    background-color: ${COLORS.darkGreen};
    border: 1px ${COLORS.black} solid;
    display: flex;
    cursor: pointer;
`

const SButtonTitle = styled.h2`
    font-size: 25px;
    width: 100%;
    text-align: center;
`

export default Carrito
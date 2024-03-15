import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import trash from "../../../public/icons/trashIcon.svg"
import { useEffect, useState } from "react"


interface CartProps {
    productoId: number,
    productoNombre: string,
    productoColor: string,
    productoPrecio: number,
    productoPrecioDescuento: number,
    talla?: string,
    cantidad:number,
}

const Carrito: React.FC<CartProps> = ({productoId,productoNombre,productoColor,productoPrecio,productoPrecioDescuento,talla,cantidad}) => {

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
        const nuevoCarrito = [...prodCarrito];
        const indice = prodCarrito.findIndex((prod) => prod.id === id);
        
        if (indice !== -1) {
            const nuevoCarritoActualizado = [...nuevoCarrito];
            nuevoCarritoActualizado.splice(indice, 1);
            setProdCarrito(nuevoCarritoActualizado);
        } else {
        }
    }


    return(
        <SCartProdContainer>
            <SCartProdImage src={"imagen"} alt="" width={0} height={0}/>
            <SInfoContainer>
                <SCartName>{"nombre"}</SCartName>
                <SModifyContainer>
                    <SColor id={"color"}/>
                    <SSize>{"talla"}</SSize>
                    <SQuantity>
                        <SAdd>+</SAdd>
                        <SNumber>{"cantidad"}</SNumber>
                        <SSubtract>-</SSubtract>
                    </SQuantity>
                </SModifyContainer>
                
                <SPriceContainer>
                    <SFinalPrice>{"descuento"}€</SFinalPrice>
                    <SSaleWithoutDiscount>{"precio"}€</SSaleWithoutDiscount>
                </SPriceContainer>
            </SInfoContainer>
            <SIconsContainer>
                <STrashIcon src={trash} alt="" onClick={() => eliminarElemento(0)}/>
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

export default Carrito
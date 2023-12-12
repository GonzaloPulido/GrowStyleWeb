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

interface FavProps {
    isActive: boolean,
    onClose: () => void
}

const Favoritos: React.FC<FavProps> = ({onClose, isActive}) => {
    const [prodFavoritos, setProdFavoritos] = useState([
        {id: 1, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 2, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 3, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 4, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 5, nombre: "Camiseta Roja" , color: "rojo", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 6, nombre: "Camiseta Azul" , color: "azul", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 7, nombre: "Camiseta Negro" , color: "negro", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
        {id: 8, nombre: "Camiseta Verde" , color: "verde", talla: "M", precio: 10, descuento: 20.05, imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7241/508/800/7241508800_2_1_8.jpg?t=1697805739291&imwidth=1125"},
    ])


    const eliminarElemento = (id: number) => {
        console.log("Eliminando...");
        const nuevosFavoritos = [...prodFavoritos];
        const indice = prodFavoritos.findIndex((prod) => prod.id === id);
        
        if (indice !== -1) {
            const nuevosFavoritosActualizado = [...nuevosFavoritos];
            nuevosFavoritosActualizado.splice(indice, 1);
            setProdFavoritos(nuevosFavoritosActualizado);
            console.log("Elemento eliminado:", id);
        } else {
            console.error("Elemento no encontrado");
        }
    }


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
                            {prodFavoritos.map((prod)=>{
                                const { id, nombre, color, precio, descuento, imagen } = prod;
                                console.log(imagen);
                                return(
                                    <SFavContainer>
                                        <SFavImage src={imagen} alt="" width={0} height={0}/>
                                        <SInfoContainer>
                                            <SNameFav>{nombre}</SNameFav>
                                            <SColor id={color}/>
                                            <SPriceContainer>
                                                <SFinalPrice>{precio}€</SFinalPrice>
                                                <SSaleWithoutDiscount>{descuento}€</SSaleWithoutDiscount>
                                            </SPriceContainer>
                                        </SInfoContainer>
                                        <SIconsContainer>
                                            <SBasketIcon src={basket} alt=""/>
                                            <STrashIcon src={trash} alt="" onClick={() => eliminarElemento(id)}/>
                                        </SIconsContainer>
                                    </SFavContainer>
                                )
                            })}
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
    width: 32rem;
    height: 50rem;
    background-color: ${COLORS.backgroundWhite};
    border-bottom-left-radius: 0.375rem;
    overflow-y: auto;
    flex-direction: column;
    justify-content: space-between;
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
`

const SIconsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
const SFavImage = styled(Image)`
    width: 90px;
    height: 135px;
`

const SNameFav = styled.h2`
    font-size: 25px;
`

const SColor = styled.div`
    padding: 5px;
    width: 100%;
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


export default Favoritos
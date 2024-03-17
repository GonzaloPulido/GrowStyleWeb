import dynamic from "next/dynamic"
import styled from "styled-components"
import { COLORS } from "../../share/colors"
import Image from "next/image"
import close from "../../../public/icons/closeIcon.svg"
import basket from "../../../public/icons/basketIcon.svg"
import trash from "../../../public/icons/trashIcon.svg"
import { SetStateAction, useEffect, useState } from "react"
import useAuthStore from "../../store/loginStore"
import { fetchProductById } from "../../api/utils/productoFunctions"
import CarritoProductoComponent from "../CarritoProductoComponent/CarritoProductoComponent"
import { customToast } from "../../share/notifications"
import React from "react"

const DynamicPortal = dynamic(
    () => import("../../components/ReactPortal/ReactPortal"),
    {ssr: false}
)

interface CartProps {
    isActive: boolean,
    onClose: () => void
}

interface CartItem {
    cartProductId: number;
    cantidadProd: number;
    tallaProd?: string;
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

interface ProductoCarrito {
    producto: Producto;
    cantidad: number;
    talla?: string;
}

const Carrito: React.FC<CartProps> = ({onClose, isActive}) => {
    const myUser = useAuthStore.getState().loggedUser
    const loggedUser = useAuthStore.getState().loggedUser
    const [carrito, setCarrito] = useState<CartItem[]|null>(null)
    const [productos, setProductos] = useState<ProductoCarrito[]>()
    const [errorAlertShown, setErrorAlertShown] = useState(false)
    const [precioTotalCarrito, setPrecioTotalCarrito] = useState(0);
    
    useEffect( () => {
        if(loggedUser && myUser){
            const callCarrito = localStorage.getItem(`cart_${myUser.id}`);
            if (callCarrito) {
                const parsedCarrito: CartItem[] = JSON.parse(callCarrito);
                setCarrito(parsedCarrito);
            } else {
                setCarrito(null);
            }
        }
    }, [])

    useEffect(() => {
        if(carrito && carrito !== null){
            const fetchProducts = async () => {
                const productosList = [];
                for(const element of carrito) {
                    const { cantidadProd, cartProductId, tallaProd } = element;
                    const fetchedProd = await fetchProductById(cartProductId);
                    if(fetchedProd) {
                        const productoConCantidadYTalla = {
                            producto: fetchedProd,
                            cantidad: cantidadProd,
                            talla: tallaProd
                        };
                        productosList.push(productoConCantidadYTalla);
                    } 
                }
                setProductos(productosList);
            };
            fetchProducts();
        }
    }, [carrito]);

    useEffect(() => {
        setPrecioTotalCarrito(calcularPrecioTotal());
    }, [productos]);

    const handleEliminarProdCarrito = (carrito: CartItem[] | null, productoId: number, talla: string) => {
        if (carrito) {
            const indiceProductoAEliminar = carrito.findIndex(objeto => objeto.cartProductId === productoId && objeto.tallaProd === talla);
            if (indiceProductoAEliminar !== -1) {
                const nuevoCarrito = [...carrito];
                nuevoCarrito.splice(indiceProductoAEliminar, 1);
                localStorage.setItem(`cart_${myUser.id}`, JSON.stringify(nuevoCarrito));
                setCarrito(nuevoCarrito);

                if (!errorAlertShown) {
                    customToast("Producto eliminado del carrito", {
                        type: "success",
                        position: "top-left",
                        autoClose: 3000,
                        theme: "colored",
                    });
                    setErrorAlertShown(true);
                }
                setErrorAlertShown(false);
            }
        }
    };

    const calcularPrecioTotal = () => {
        let precioTotal = 0;
        productos?.forEach(producto => {
            const precioProducto = producto.producto.precio_descuento > 0 ? producto.producto.precio_descuento : producto.producto.precio;
            precioTotal += precioProducto * producto.cantidad;
        });
        return parseFloat(precioTotal.toFixed(2));
    
    };

    const aumentarCantidadProdCarrito = (carrito: CartItem[] | null, productoId: number, talla: string) => {
        if (carrito) {
            const indiceProducto = carrito.findIndex(objeto => objeto.cartProductId === productoId && objeto.tallaProd === talla);
            if (indiceProducto !== -1) {
                const nuevoCarrito = [...carrito];
                nuevoCarrito[indiceProducto].cantidadProd += 1;
                localStorage.setItem(`cart_${myUser.id}`, JSON.stringify(nuevoCarrito));
                setCarrito(nuevoCarrito);
            }
        }
    };

    const disminuirCantidadProdCarrito = (carrito: CartItem[] | null, productoId: number, talla: string) => {
        if (carrito) {
            const indiceProducto = carrito.findIndex(objeto => objeto.cartProductId === productoId && objeto.tallaProd === talla);
            if (indiceProducto !== -1 && carrito[indiceProducto].cantidadProd > 1) {
                const nuevoCarrito = [...carrito];
                nuevoCarrito[indiceProducto].cantidadProd -= 1;
                localStorage.setItem(`cart_${myUser.id}`, JSON.stringify(nuevoCarrito));
                setCarrito(nuevoCarrito);
            }
        }
    };

    
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
                            {productos && carrito!.length >0 ? (
                                
                                productos?.map((prod)=>{
                                    let myKey = ""
                                    const {producto, cantidad, talla} = prod
                                    if (talla) {
                                        myKey = producto.id+talla
                                    }else{
                                        myKey = `${producto.id} `
                                    }
                                    return(
                                        <CarritoProductoComponent key={myKey}  productoId={producto.id} productoNombre={producto.nombre} productoColor={producto.color}
                                        productoPrecio={producto.precio} productoPrecioDescuento={producto.precio_descuento} talla={talla}
                                        cantidad={cantidad} imagen={producto.imagen} onDeleteProdCarrito={handleEliminarProdCarrito} aumentarCantidad={aumentarCantidadProdCarrito}
                                        disminuirCantidad={disminuirCantidadProdCarrito}
                                        carritoPadre={carrito}
                                        ></CarritoProductoComponent>
                                    )
                                }) 
                                
                            ): (<SEmpty>No tienes productos en favoritos</SEmpty>)}
                                {!carrito && <React.Fragment>
                                    <SFinalPriceContainer>
                                        <STitlePrice>Total: </STitlePrice>
                                        <STitleNumber>{precioTotalCarrito}€</STitleNumber>
                                    </SFinalPriceContainer>
                                    <SBuyButton>
                                        <SButtonTitle>Tramitar pedido</SButtonTitle>
                                    </SBuyButton>
                                </React.Fragment>}                             
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

const SContainerCart = styled.div`
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

const SprodContainer = styled.div`
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
const SprodImage = styled(Image)`
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
    color: ${COLORS.white};
`

const SButtonTitle = styled.h2`
    font-size: 25px;
    width: 100%;
    text-align: center;
`

const SEmpty = styled.h2`
    font-size: 25px;
    text-align: center;
    margin-top: 200px;
`

export default Carrito
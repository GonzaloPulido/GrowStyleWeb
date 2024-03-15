
import { fetchImageById } from "../api/utils/imagenFunctions"
import { customToast } from "../share/notifications";

interface ImageObject {
    _id: string
    base64: string
}

interface CartItem {
    cartProductId: number;
    cantidadProd: number;
    tallaProd?: string;
}

export const base64topng = async (id: string) => {
    const imgObject: ImageObject = await fetchImageById(id)
    const {_id, base64} = imgObject
    const myResult = "data:image/png;base64,"+base64
    return myResult
}

const mapNumeroTallaATexto = (numeroTalla: number): string | undefined => {
    switch (numeroTalla) {
        case 1:
            return 'xs';
        case 2:
            return 's';
        case 3:
            return 'm';
        case 4:
            return 'l';
        case 5:
            return 'xl';
        case 6:
            return 'xxl';
        default:
            return undefined;
    }
};

export const addToCart = (loggedUser: boolean, productId: number, userId: number, numeroTalla?: number) => {
    if (loggedUser) {
        const talla = numeroTalla !== undefined ? mapNumeroTallaATexto(numeroTalla) : undefined;

        const storedCart = localStorage.getItem(`cart_${userId}`);
        let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

        const existingItemIndex = cart.findIndex(item => item.cartProductId === productId && item.tallaProd === talla);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].cantidadProd++;
        } else {
            cart.push({ cartProductId: productId, cantidadProd: 1, tallaProd: talla });
        }
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        customToast("Producto añadido al carrito", {
            type: "success",
            position: "top-left",
            autoClose: 3000,
            theme: "colored",
        });
    } else {
        console.error('Error: Usuario no autenticado');
    }
};



import { CART_ADD_PRODUCT, CART_UPDATE_PRODUCT, CART_REMOVE_PRODUCT } from "../constants/cart";

export const cartAddProduct = (product) => {
    return {
        type: CART_ADD_PRODUCT,
        payload: product,
    }
}

export const cartUpdateProduct = (product) => {
    return {
        type: CART_UPDATE_PRODUCT,
        payload: product,
    }
}

export const cartRemoveProduct = (product) => {
    return {
        type: CART_REMOVE_PRODUCT,
        payload: product.id,
    }
}
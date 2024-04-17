import { CART_ADD_PRODUCT, CART_UPDATE_PRODUCT, CART_REMOVE_PRODUCT, CART_RESET } from "../constants/cart";

export const cartAddProduct = (payload) => {
    return {
        type: CART_ADD_PRODUCT,
        payload: payload,
    }
}

export const cartUpdateProduct = (payload) => {
    return {
        type: CART_UPDATE_PRODUCT,
        payload: payload,
    }
}

export const cartRemoveProduct = (product) => {
    return {
        type: CART_REMOVE_PRODUCT,
        payload: product.id,
    }
}

export const cartReset = () => {
    return {
        type: CART_RESET
    }
}
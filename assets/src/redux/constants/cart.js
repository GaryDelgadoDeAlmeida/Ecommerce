export const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
export const CART_UPDATE_PRODUCT = "CART_UPDATE_PRODUCT";
export const CART_REMOVE_PRODUCT = "CART_REMOVE_PRODUCT";

export function deepCardsCopy({carts}) {
    return carts.map((s) => ({ ...s }));
}
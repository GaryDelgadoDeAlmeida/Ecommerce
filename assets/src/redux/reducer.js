import { CART_ADD_PRODUCT, CART_UPDATE_PRODUCT, CART_REMOVE_PRODUCT, deepCardsCopy, CART_RESET } from "./constants/cart";
import { USER_SIGN_IN_ACCOUNT, USER_LOGOUT_ACCOUNT, USER_EXPIRED_TOKEN } from "./constants/user";

const initialState = {
    user: {
        token: "",
        role: ""
    },
    carts: []
}

const copyInitialState = JSON.parse(JSON.stringify(initialState));

const reducer = (state = copyInitialState, action) => {
    let carts = null;

    switch(action.type) {
        case CART_ADD_PRODUCT:
            carts = deepCardsCopy(state)
            let existingCarts = carts.filter((item) => item.product.id == action.payload.product.id)
            console.error(existingCarts, action)
            
            if(existingCarts.length > 0) {
            // if(carts.includes(state.product)) {
                return {
                    ...state,
                    message: "Attention, vous ne pouvez pas ajouter deux fois le même produit"
                }

                // existingCarts = existingCarts[0]
                existingCarts.quantity = action.payload.quantity
                carts[cartIndex] = {...cart}
            } else {
                carts = carts.concat(action.payload)
            }

            return {
                ...state,
                carts: carts
            }
    
        case CART_UPDATE_PRODUCT:
            carts = deepCardsCopy(state)
            // carts
            break;
    
        case CART_REMOVE_PRODUCT:
            carts = deepCardsCopy(state)
            carts.filter((item) => item.product.id != action.payload)
            
            return {
                ...state,
                carts: {
                    ...carts
                }
            }

        case CART_RESET:
            return {
                ...state,
                carts: {}
            }

        case USER_SIGN_IN_ACCOUNT:
        case USER_LOGOUT_ACCOUNT:
            return {
                ...state,
                user: action.payload
            }

        case USER_EXPIRED_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload
                }
            }

        default:
            return state
    }
}

export default reducer
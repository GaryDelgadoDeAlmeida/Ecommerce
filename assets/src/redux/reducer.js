import { CART_ADD_PRODUCT, CART_UPDATE_PRODUCT, CART_REMOVE_PRODUCT, deepCartsCopy, CART_RESET } from "./constants/cart";
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
            carts = {...state.carts}
            let existingCarts = carts[action.payload.product.id]

            return {
                ...state,
                carts: {
                    ...carts,
                    [action.payload.product.id]: {
                        product: {...action.payload.product},
                        quantity: Object.keys(existingCarts ?? []).length > 0 ? existingCarts.quantity + action.payload.quantity : action.payload.quantity
                    }
                }
            }
    
        case CART_UPDATE_PRODUCT:
            carts = {...state.carts}
            carts[action.payload.productID] = {
                [action.payload.productID]: {
                    product: {...carts[action.payload.productID].product},
                    quantity: action.payload.quantity
                }
            }

            console.log(
                action.payload,
                carts[action.payload.productID]
            )

            return {
                ...state,
                carts: {
                    ...carts
                }
            }
            break;
    
        case CART_REMOVE_PRODUCT:
            carts = {...state.carts}
            delete carts[action.payload.product.id]
            
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
import { CART_ADD_PRODUCT, CART_UPDATE_PRODUCT, CART_REMOVE_PRODUCT, deepCardsCopy } from "./constants/cart";
import { USER_SIGN_IN_ACCOUNT, USER_LOGOUT_ACCOUNT, USER_EXPIRED_TOKEN } from "./constants/user";

const initialState = {
    user: {
        token: "",
        role: ""
    },
    carts: {}
}

const copyInitialState = JSON.parse(JSON.stringify(initialState));

const reducer = (state = copyInitialState, action) => {
    let carts = null;

    switch(action.type) {
        case CART_ADD_PRODUCT:
            if(state.dragons.includes(action.payload)) {
                return {
                    ...state,
                    message: "Attention, vous ne pouvez pas ajouter deux fois le même produit"
                }
            }

            return {
                ...state,
                carts: state.carts.concat(action.payload)
            }
    
        case CART_UPDATE_PRODUCT:
            carts = deepCardsCopy(state)
            // carts
            break;
    
        case CART_REMOVE_PRODUCT:
            carts = deepCardsCopy(state)
            carts.filter((item) => item.id != action.payload)
            
            return {
                ...state,
                carts: {
                    ...carts
                }
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
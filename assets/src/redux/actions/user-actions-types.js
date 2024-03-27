import { USER_SIGN_IN_ACCOUNT, USER_LOGOUT_ACCOUNT, USER_EXPIRED_TOKEN } from "../constants/user";

export const user_sign_in_account = (user) => {
    return {
        type: USER_SIGN_IN_ACCOUNT,
        payload: user,
    }
}

export const user_logout_account = () => {
    return {
        type: USER_LOGOUT_ACCOUNT,
        payload: {
            firstname: "",
            lastname: "",
            token: "",
            role: ""
        },
    }
}

export const user_expired_token = () => {
    return {
        type: USER_EXPIRED_TOKEN,
        payload: "",
    }
}
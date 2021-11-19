import { USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT } from "./action-types/actionTypes"

export const userIsLoggedIn = (logged) => {
    return {
        type: USER_IS_LOGGED_IN,
        payload: logged
    }
}

export const userIsLoggedOut = () => {
    return {
        type: USER_IS_LOGGED_OUT
    }
}
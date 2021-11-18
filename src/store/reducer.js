import { USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT } from "./actions/action-types/actionTypes";

export const initState = {
    logged: JSON.parse(localStorage.getItem("logged")) || false,
    loggedUser: JSON.parse(localStorage.getItem("loggedUser")) || null,
    clientId: "4b4a3783ee944a9e46c7",
    redirectUri: "http://localhost:3000/data",
    proxyUrl: "http://localhost:5000",
}

export default function (state = initState, action) {
    switch (action.type) {
        case USER_IS_LOGGED_IN: {
            localStorage.setItem("logged", JSON.stringify(action.payload.logged));
            localStorage.setItem("loggedUser", JSON.stringify(action.payload.loggedUser));
            return {
                ...state,
                logged: action.payload.logged,
                loggedUser: action.payload.loggedUser
            }
        }
        case USER_IS_LOGGED_OUT: {
            localStorage.clear();
            return {
                ...state,
                logged: false,
                loggedUser: null
            }
        }
        default:
            return state;
    }
}
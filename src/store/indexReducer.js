import { combineReducers } from "redux";
import reducer from "./reducer";

const allReducers = combineReducers({
    loggedUser: reducer
})

export default allReducers;
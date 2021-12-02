import { combineReducers } from "redux";
import { authReducer } from "../ducks/auth";
import { userReducer } from "../ducks/user";
import { vaccinationReducer } from "../ducks/vaccination";
import { vaccineReducer } from "../ducks/vaccine";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    vaccine: vaccineReducer,
    vaccination: vaccinationReducer
});
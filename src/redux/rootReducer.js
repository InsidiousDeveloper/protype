import { combineReducers } from "redux";
import { typerReducer } from "./typer";

export const rootReducer = combineReducers({
    typer: typerReducer
})
import {DateSelection} from "../state/DateSelection.ts";
import {createContext, useContext} from "react";

export const DateContext = createContext<DateSelection | undefined>(undefined);

export function useDateContext() {
    return useContext(DateContext)!;
}
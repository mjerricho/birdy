import React, { createContext, useContext, useReducer } from "react";

// preparing data layout - creating a context, where data lives
export const StateContext = createContext();

// data layout - higher order component
// take 3 things
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

// allow us to pull from data layout
export const useStateValue = () => useContext(StateContext);
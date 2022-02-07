import React, { createContext, useContext, useReducer } from "react";

//Prepare the dataLayer for the components
export const StateContext = createContext();

//Wrap our app and provide the Data Layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
//Pull data from the Data Layer
const useStateValue = () => useContext(StateContext);
export default useStateValue;

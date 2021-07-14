import React, { useReducer, useContext, createContext } from "react";
const HomeContext = createContext();

function reducer(state, action) {
  return state;
}

export default function HomeProvider({ children }) {
  const [{ data }, dispatchHome] = useReducer(reducer, { data: [] });
  return (
    <HomeContext.Provider value={{ data, dispatchHome }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => useContext(HomeContext);

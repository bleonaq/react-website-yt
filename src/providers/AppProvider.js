import { RotateLeft } from '@material-ui/icons';
import React, { useReducer, useContext, createContext } from 'react';
const AppContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      sessionStorage.setItem('jwtToken', action.payload.token);      
      sessionStorage.setItem('jwtExpiration', action.payload.expiration);
      sessionStorage.setItem('name', action.payload.name);
      sessionStorage.setItem('role', action.payload.role);
      return {
        user: action.payload
      }    
    case "logout":
      sessionStorage.removeItem('jwtToken');      
      sessionStorage.removeItem('jwtExpiration');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('role');
      return {
          user: {token: '', expiration: '', name : '', role:'' }
      }    
    default:
      return state;
  }
}

export default function AppProvider({ children }) {
  let token = sessionStorage.getItem('jwtToken');  
  let expiration = sessionStorage.getItem('jwtExpiration');  
  let name = sessionStorage.getItem('name');
  let role = sessionStorage.getItem('role');

  const [{ user }, dispatch] = useReducer(reducer, { user: {token: token || '', expiration: expiration  || '',name: name  || '',role: role  || '' }});
  return (
    <AppContext.Provider value={{ user, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);


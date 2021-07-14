import AppProvider from './providers/AppProvider';
import Routes from './Routes';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  // const { user, dispatch } = useContext(useAppContext);
  return (
    <AppProvider>
      <Routes></Routes>
    </AppProvider>
  );
}
export default App;


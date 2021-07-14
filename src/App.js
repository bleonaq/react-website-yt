import AppProvider from './providers/AppProvider';
import Routes from './Routes';
import { useEffect } from 'react';
import axios from 'axios';
// import './App.css';
import "./assets/css/sb-admin-2.min.css";
import Navbar from './components/pages/Nav-Button/Navbar';
import TopNav from './components/pages/Nav-Button/TopNav';

function App() {
  // const { user, dispatch } = useContext(useAppContext);
  return (
    <AppProvider>
     
            <Routes></Routes>
          

    </AppProvider>
  );
}
export default App;


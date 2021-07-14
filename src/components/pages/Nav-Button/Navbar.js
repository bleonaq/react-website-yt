import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './buttons';
import './Navbar.css';
function Navbar(){
    const [click,setClick]= useState(false);
    const [button, setButton]=useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 360){
           setButton(true);
        }else{
            setButton(false);
        }
    };

   useEffect(() => {
       showButton();
   }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo"onClick=
                    {closeMobileMenu}>
                        UBT <i className='fab fa-typo3'/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' :'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/students' className='nav-links' onClick={closeMobileMenu}>
                                Students
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/list' className='nav-links' onClick={closeMobileMenu}>
                                List
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/department' className='nav-links' onClick={closeMobileMenu}>
                                Department
                            </Link>
                        </li>

                        <li>
                           <Link
                           to='/signUp'
                          className='nav-links-mobile'
                          onClick={closeMobileMenu}
                         >
                          Login
                          </Link>
                         </li>

                      
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>Login</Button>}


                </div>
            </nav>

        </>
    );
}

export default Navbar
import React,  {  buttons  }  from 'react' ;
import './buttons.css'
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const STYLES =['btn--primary', 'btn--outline'];

const SIZES=['btn--medium','btn--large'];

export const Button =({children , type , onClick , buttonStyle ,
buttonSize}) =>{
    const history = useHistory();
    const handleClick = () => history.push('/some-route');
    const checkButtonStyle=STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize=SIZES.includes(buttonSize) ? buttonSize :SIZES[0];


return (
    <Link to='/login'  className='btn-mobile'>
        <button
        className={'btn ${checkButtonStyle} ${checkButtonSize}'}
        onClick={handleClick}
        type={type}
        >
         {children}   
        </button>
        
    </Link>
);
};
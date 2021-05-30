import React from 'react';
import '../App.css';
import { Button } from './buttons';
import './HeroSection.css';

function HeroSection(){
    return (
        <div className='hero-container'>
            <img src="../public/images/photo.png"/>
        
            <h1>"An investment in knowledge always pays the best interest." </h1>
            <p>What are you waiting for ?</p>

            <div className='hero-btns'>
             <Button 
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
                >
                    Get Started
             </Button>

            <Button 
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                >
                    More Info <i className='far
                    fa-play-circle' />
             </Button>
            </div>
            

        </div>
    )
}

export default HeroSection
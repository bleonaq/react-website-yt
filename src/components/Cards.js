import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check our succses story!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Our student starts working in Google'
              label='Succses'
              path='/students'
            />
            <CardItem
              src='images/img-2.jpg'
              text='The new bursist'
              label='New'
              path='/students'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Our Proffesor finishes his PHD'
              label='SuccsesStory'
              path='/Department'
            />
            <CardItem
              src='images/img-4.jpg'
              text='New Scientific work'
              label='Adventure'
              path='/Department'
            />
            <CardItem
              src='images/img-8.png'
              text='Summer Academy'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
import React from 'react';
import loadingSpiner from '../images/fallInLove.gif';
import '../css/LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div id='loading'>
      <div className='spinner'>
        <img src={loadingSpiner} alt={loadingSpiner} />
      </div>
    </div>
  );
};

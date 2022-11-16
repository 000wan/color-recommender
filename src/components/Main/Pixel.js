import React from 'react';
import './Pixel.css'

const Pixel = ({ index, vector, clicked, setClicked }) => {
  const vec_to_rgb = (vector) => `rgb(${vector[0]}, ${vector[1]}, ${vector[2]})`;
  
  const handleClick = (event) => {
    setClicked(index);
  }

  return (
    <button key={index} onClick={handleClick} style={{ backgroundColor: vec_to_rgb(vector) }} className='pixel' >
    
    </button>
  )
}


export default Pixel;
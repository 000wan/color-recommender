import React from 'react';
import './Pixel.css'

interface PixelProps {
  index: number,
  vector: number[], 
  setClicked: (index: number) => void
}

const Pixel = ({ index, vector, setClicked }: PixelProps) => {
  const vec_to_rgb = (vector: number[]) => `rgb(${vector[0]}, ${vector[1]}, ${vector[2]})`;
  
  const handleClick = (event: any) => {
    setClicked(index);
  }

  return (
    <button key={index} onClick={handleClick} style={{ backgroundColor: vec_to_rgb(vector) }} className='pixel' >
    
    </button>
  )
}


export default Pixel;
import React, { useEffect, useState } from 'react';
import './css/Palette.css'

interface PaletteProps {
  setPick: (pick: string) => void,
  foreground: string,
  setForeground: (foreground: string) => void
}

const Palette = ({ setPick, foreground, setForeground }: PaletteProps) => {
  const [ selected, setSelected ] = useState<string>('pointer');

  const handlePick = () => {
    switch( selected ) {
      case 'pointer':
        setPick('');
        break;
      case 'eraser':
        setPick('#000000');
        break;
      case 'foreground':
        setPick(foreground);
        break;
      default:
        break;
    }
  }
  // eslint-disable-next-line
  useEffect(handlePick, [ foreground, selected ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch ( name ) {
      case 'foreground':
        setForeground( value );
        break;
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setSelected( e.currentTarget.value );
  }

  return (
    <div className='palette'>
    <table><tbody><tr>
      <td>
      <label htmlFor="pointer" className='l-radio'>
        <input type="radio" id="pointer" className='radio-input' name="selected" value="pointer" onClick={(e) => handleClick(e)} defaultChecked />
        <span>Pointer</span>
      </label>
      </td>

      <td>
      <label htmlFor="eraser" className='l-radio'>
        <input type="radio" id="eraser" className='radio-input' name="selected" value="eraser" onClick={(e) => handleClick(e)} />
        <span>Eraser</span>
      </label>
      </td>
      
      <td>
      <label htmlFor="fore" className='l-radio'>
        <input type="radio" id="fore" className='radio-input' name="selected" value="foreground" onClick={(e) => handleClick(e)} />
        <input type="color" id="foreground" className='color-input' name="foreground" value={ foreground } onChange={ handleChange } />
        <span>Brush</span>
      </label>
      </td>
    </tr></tbody></table>
    </div>
  );
}

export default Palette;
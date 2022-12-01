import React, { useEffect, useState } from 'react';
import './css/Palette.css'

interface PaletteProps {
  setPick: React.Dispatch<React.SetStateAction<string>>,
  FBrushColor: string,
  BBrushColor: string,
  setFBrushColor: React.Dispatch<React.SetStateAction<string>>,
  setBBrushColor: React.Dispatch<React.SetStateAction<string>>
}

const Palette = ({ setPick, FBrushColor, BBrushColor, setFBrushColor, setBBrushColor }: PaletteProps) => {
  const [ selected, setSelected ] = useState<string>('pointer');
  const [ foreground, setForeground ] = useState<string>('#000000');
  const [ background, setBackground ] = useState<string>('#ffffff');

  useEffect(() => {
    if( FBrushColor ) {
      setForeground(FBrushColor);
      setFBrushColor(''); // trigger off
    }
  }, [ FBrushColor, setFBrushColor ]);

  useEffect(() => {
    if( BBrushColor ) {
      setBackground(BBrushColor);
      setBBrushColor(''); // trigger off
    }
  }, [ BBrushColor, setBBrushColor ]);


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
      case 'background':
        setPick(background);
        break;
      default:
        break;
    }
  }
  
  useEffect(handlePick, [ foreground, background, selected, setPick ]);

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
        <input type="color" id="foreground" className='color-input' name="foreground" value={ foreground } onChange={(e) => setForeground( e.target.value )} />
        <span>Foreground</span>
      </label>
      </td>

      <td>
        <label htmlFor="back" className='l-radio'>
          <input type="radio" id="back" className='radio-input' name="selected" value="background" onClick={(e) => handleClick(e)} />
          <input type="color" id="background" className='color-input' name="background" value={ background } onChange={(e) => setBackground( e.target.value )} />
          <span>Background</span>
        </label>
        </td>
    </tr></tbody></table>
    </div>
  );
}

export default Palette;
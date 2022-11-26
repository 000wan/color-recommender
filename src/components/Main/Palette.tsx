import React from 'react';
import './css/Palette.css'

interface PaletteProps {
  setPick: (pick: string) => void
}

interface PaletteInterface {
  selected: string,
  foreground: string,
  background: string
}

class Palette extends React.Component <PaletteProps, PaletteInterface> {
  protected setPick: (pick: string) => void;

  constructor(props: PaletteProps) {
    super(props);
    this.setPick = props.setPick;

    this.state = {
      selected: 'pointer',
      foreground: '#000000',
      background: '#ffffff'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlePick = () => {
    switch(this.state.selected) {
      case 'pointer':
        this.setPick('');
        break;
      case 'eraser':
        this.setPick('#000000');
        break;
      case 'foreground':
        this.setPick(this.state.foreground);
        break;
      case 'background':
        this.setPick(this.state.background);
        break;
      default:
        break;
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch(name) {
      case 'foreground':
        this.setState({
          [name]: value
        }, this.handlePick);
        break;
      case 'background':
        this.setState({
          [name]: value
        }, this.handlePick);
        break;
    }
  }

  handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    this.setState({
      'selected': e.currentTarget.value
    }, this.handlePick);
  }

  render() {
    return (
      <div className='palette'>
      <table><tbody><tr>
        <td>
        <label htmlFor="pointer" className='l-radio'>
          <input type="radio" id="pointer" className='radio-input' name="selected" value="pointer" onClick={(e) => this.handleClick(e)} defaultChecked />
          <span>Pointer</span>
        </label>
        </td>

        <td>
        <label htmlFor="eraser" className='l-radio'>
          <input type="radio" id="eraser" className='radio-input' name="selected" value="eraser" onClick={(e) => this.handleClick(e)} />
          <span>Eraser</span>
        </label>
        </td>
        
        <td>
        <label htmlFor="fore" className='l-radio'>
          <input type="radio" id="fore" className='radio-input' name="selected" value="foreground" onClick={(e) => this.handleClick(e)} />
          <input type="color" id="foreground" className='color-input' name="foreground" value={this.state.foreground} onChange={this.handleChange} />
          <span>Foreground</span>
        </label>
        </td>

        <td>
        <label htmlFor="back" className='l-radio'>
          <input type="radio" id="back" className='radio-input' name="selected" value="background" onClick={(e) => this.handleClick(e)} />
          <input type="color" id="background" className='color-input' name="background" value={this.state.background} onChange={this.handleChange} />
          <span>Background</span>
        </label>
        </td>
      </tr></tbody></table>
      </div>
    );
  }
}

export default Palette;
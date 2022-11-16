import React from 'react';
import './Palette.css'

class Palette extends React.Component {
  constructor(props) {
    super(props);
    this.setPick = props.setPick;

    this.state = {
      selected: 'pointer',
      foreground: '#000000',
      background: '#ffffff'
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    }, this.handlePick);
  }

  render() {
    return (
      <div id='palette'>
      <table><tbody><tr>
        <td>
        <label htmlFor="pointer" className='l-radio'>
          <input type="radio" id="pointer" className='radio-input' name="selected" value="pointer" onClick={this.handleChange} defaultChecked />
          <span>Pointer</span>
        </label>
        </td>

        <td>
        <label htmlFor="eraser" className='l-radio'>
          <input type="radio" id="eraser" className='radio-input' name="selected" value="eraser" onClick={this.handleChange} />
          <span>Eraser</span>
        </label>
        </td>
        
        <td>
        <label htmlFor="fore" className='l-radio'>
          <input type="radio" id="fore" className='radio-input' name="selected" value="foreground" onClick={this.handleChange} />
          <input type="color" id="foreground" className='color-input' name="foreground" value={this.state.foreground} onChange={this.handleChange} />
          <span>Foreground</span>
        </label>
        </td>

        <td>
        <label htmlFor="back" className='l-radio'>
          <input type="radio" id="back" className='radio-input' name="selected" value="background" onClick={this.handleChange} />
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
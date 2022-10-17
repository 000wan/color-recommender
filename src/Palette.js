import React from 'react';

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
        this.setPick(null);
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
      <div>
        <input type="radio" id="pointer" name="selected" value="pointer" onClick={this.handleChange} defaultChecked />
        <label htmlFor="pointer">Pointer</label>

        <input type="radio" id="eraser" name="selected" value="eraser" onClick={this.handleChange} />
        <label htmlFor="eraser">Eraser</label>

        <input type="radio" id="fore" name="selected" value="foreground" onClick={this.handleChange} />
        <input type="color" id="foreground" name="foreground" value={this.state.foreground} onChange={this.handleChange} />
        <label htmlFor="fore">&nbsp;Foreground</label>

        <input type="radio" id="back" name="selected" value="background" onClick={this.handleChange} />
        <input type="color" id="background" name="background" value={this.state.background} onChange={this.handleChange} />
        <label htmlFor="back">&nbsp;Background</label>
      </div>
    );
  }
}

export default Palette;
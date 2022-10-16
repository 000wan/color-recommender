import React from 'react';
import './Pixel.css'

/*
class Pixel extends React.Component {
  constructor(props) {
    super(props);
    const {index, vector, clicked, setClicked} = props;
    this.index = index;
    this.clicked = clicked;
    this.setClicked = setClicked;
    
    if(vector !== this.state.vector) {
      this.setState({
        vector: vector
      })
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //this.setState({
    //});
  }

  handleClick(event) {
    this.setClicked(this.index);
  }

  vec_to_rgb = (vector) => `rgb(${vector[0]}, ${vector[1]}, ${vector[2]})`;

  render() {
    return (
      <button key={this.index} onClick={this.handleClick} style={{ backgroundColor: this.vec_to_rgb(this.state.vector) }} className='pixel' >
        {this.index}
      </button>
    );
  }
}
*/

const Pixel = ({ index, vector, clicked, setClicked }) => {
  const vec_to_rgb = (vector) => `rgb(${vector[0]}, ${vector[1]}, ${vector[2]})`;
  
  const handleClick = (event) => {
    setClicked(index);
  }

  return (
    <button key={index} onClick={handleClick} style={{ backgroundColor: vec_to_rgb(vector) }} className='pixel' >
      {index}
    </button>
  )
}


export default Pixel;
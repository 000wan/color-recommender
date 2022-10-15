import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pixel from './Pixel';

import { create, all } from 'mathjs';
const config = { };
const math = create(all, config);

const gridSize = 10;

const convergeRate = 0.5;

const Container = styled.div`
  display: grid;
  gap: 2px;
  justify-content: center;

  grid-template-columns: repeat(${gridSize}, ${500/gridSize}px);
  grid-template-rows: repeat(${gridSize}, ${500/gridSize}px);
  `

const LatticeGrid = () => {
  const [ clicked, setClicked ] = useState(-1);
  const [ item, setItem ] = useState(Array(gridSize * gridSize).fill(null).map((element, i) => {
    return {
      index: i,
      vector: [0, 0, 0]
    }
  }));

  const index_to_xy = (index) => {
    return {
      x: parseInt(index / gridSize),
      y: index % gridSize
    }};
  const xy_to_index = (x,y) => x*gridSize + y;

  function convergeTo(vector, pivotVector, convergeRate) {
    // convergeRate should be 0(doesn't converge) ~ 1(converge at once).
    let u = math.multiply(pivotVector, convergeRate);
    let v = math.multiply(vector, 1-convergeRate);

    return math.add(u, v);
  }

  function gather(pivot, item) {
    const u = item[pivot].vector;
    const {x, y} = index_to_xy(pivot);
 
    const dx = [- 1, 0, 1, - 1, 1, - 1, 0, 1];
    const dy = [- 1, - 1, - 1, 0, 0, 1, 1, 1];
    
    for(let i = 0; i < dx.length; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if(nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
        let nindex = xy_to_index(nx, ny);
        let v = item[nindex].vector;
        item[nindex].vector = convergeTo(v, u, convergeRate);
      }
    }
  }

  useEffect(() => {
    if(clicked !== -1) {
      const newItem = item.filter(() => true);
      newItem[clicked].vector = [0,0,200];
      gather(clicked, newItem);

      setItem(newItem);
      setClicked(-1);
    }
  }, [clicked]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      {
        item.map(({ index, vector }) => <Pixel index={index} vector={vector} clicked={clicked} setClicked={setClicked} />)
      }
    </Container>
  );
};

export default LatticeGrid;
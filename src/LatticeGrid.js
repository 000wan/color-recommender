import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Pixel from './Pixel';

import { create, all } from 'mathjs';
const config = { };
const math = create(all, config);

const gridSize = 10;  // assign gridSize N
const gridWidth = 500;  // (px)

const convergeRate = 0.5;  // converge speed : 0~1
const decayRate = 0.1;  // heat transfer speed : >0

const timerDelay = 1000;  // (ms)
const tickTime = 3000;  // (ms)

const Container = styled.div`
  display: grid;
  gap: 2px;
  justify-content: center;

  grid-template-columns: repeat(${gridSize}, ${gridWidth/gridSize}px);
  grid-template-rows: repeat(${gridSize}, ${gridWidth/gridSize}px);
  `

// useInterval Hook
// Ref: https://velog.io/@yeyo0x0/React-React-Hooks%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EB%AC%B8%EC%A0%9C
const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


// Basic operations
const index_to_xy = (index) => {  // index = x*gridSize + y
  return {
    x: parseInt(index / gridSize),
    y: index % gridSize
  }};
const xy_to_index = (x,y) => x*gridSize + y;

// execute given function to all adjacent pixels
function doAdjacent(pivot, targetFunction=()=>null, targetCondition=()=>true) {
  const {x, y} = index_to_xy(pivot);

  const dx = [- 1, 0, 1, - 1, 1, - 1, 0, 1];
  const dy = [- 1, - 1, - 1, 0, 0, 1, 1, 1];
  
  let flag = true;
  for(let i = 0; i < dx.length; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if(nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
      let nindex = xy_to_index(nx, ny);
      targetFunction(nindex);
      flag = flag && targetCondition(nindex);
    }
  }

  return flag;
}


// Discrete heat equation
// Ref: https://en.wikipedia.org/wiki/Discrete_Laplace_operator#Discrete_heat_equation
const N = gridSize;
const Adj = math.zeros(N * N, N * N);

for(let i = 0; i < N*N; i++) {
  doAdjacent(i, (index) => {
    Adj.set([i, index], 1);
  })
}

const Deg = math.diag(math.sum(Adj, 1));
const L = math.subtract(Deg, Adj);

const eigen = math.eigs(L);
const V = eigen.vectors;  // matrix of eigenvectors
const D = eigen.values;  // column vector with eigenvalues

const transform = (N, x, dt, k) => {
  //let x = math.reshape(matrix, N);  // matrix to 1D vector
  let Vx = math.multiply(math.transpose(V), x);

  let Phi = math.dotMultiply(math.map(math.multiply(-k, D, dt), math.exp), Vx);
  Phi = math.multiply(V, Phi);
  //Phi = math.reshape(Phi, [N, N]);
  Phi = Phi.toArray();
  return Phi;
}


// Vector operations
const blackVector = [0, 0, 0];
const threshold = 30;  // color vector (R,G,B) similarity threshold

const similarity = (u,v) => math.distance(u,v);  // Euclidian similarity
const isSimilar = (u,v) => similarity(u,v) < threshold;

function convergeTo(vector, pivotVector, convergeRate) {
  // convergeRate should be 0(doesn't converge) ~ 1(converge at once).
  let u = math.multiply(pivotVector, convergeRate);
  let v = math.multiply(vector, 1-convergeRate);

  return math.add(u, v);
}

// gather adjacent pixel vectors into center(pivot) pixel
const gather = (pivot, item) => {
  doAdjacent(pivot, (index) => {
    item[index].vector = convergeTo(item[index].vector, item[pivot].vector, convergeRate) // (target vector, pivot vector, conv rate)
  })
}


function generateRandomPixel(item) {
  const randIndex = math.randomInt(0, gridSize * gridSize);

  if(isSimilar(item[randIndex].vector, blackVector)) {
    if(doAdjacent(randIndex, ()=>null, (index) => 
      isSimilar(item[randIndex].vector, item[index].vector)
      )) {
      item[randIndex].vector = math.random([3], 0, 256);
      gather(randIndex, item);

      return true;
    }
  }
  return false;
}


// main
const LatticeGrid = () => {
  const [ clicked, setClicked ] = useState(-1);
  const [ item, setItem ] = useState(Array(gridSize * gridSize).fill(null).map((element, i) => {
    return {
      index: i,
      vector: blackVector
    }
  }));
  const copyItem = (item) => item.filter(() => true);

  const [ timer, setTimer ] = useState(0);

  const tick = () => {
    setTimer(timer => timer + 1);

    const itemVectors = item.map(({vector}) => vector);
    const itemMatrix = [];
    for(let i = 0; i < 3; i++) {
      let componentVector = itemVectors.map((vector) => vector[i]);
      componentVector = transform(gridSize, componentVector, timerDelay/1000, decayRate);
      itemMatrix.push(componentVector);
    }

    const newItem = item.map(({index, vector}, i) => {
      return {
        index,
        vector: vector.map((element, j) => itemMatrix[j][i])
      }
    })
    
    if(timer >= tickTime/timerDelay) {
      if (generateRandomPixel(newItem)) {
        setTimer(0);
      }
    }
    
    setItem(newItem);
    console.log(timer);
  }

  useInterval(tick, timerDelay);

  useEffect(() => {
    if(clicked !== -1) {
      const newItem = copyItem(item);
      //newItem[clicked].vector = [0,0,255];
      gather(clicked, newItem);

      setItem(newItem);
      setClicked(-1);
    }
    else {
      setTimer(0);
    }
  }, [clicked]);  // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <Container>
      {
        item.map(({ index, vector }) => <Pixel index={index} vector={vector} clicked={clicked} setClicked={setClicked} />)
      }
    </Container>
  );
};

export default LatticeGrid;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pixel from './Pixel';

import { create, all } from 'mathjs';
import { APILogAction } from '../../tools/api';
import { useInterval } from '../../tools/interval';
const config = { };
const math = create(all, config);

const gridSize = 10;  // assign gridSize N
const gridWidth = 500;  // (px)

const convergeRate = 0.5;  // converge speed : 0~1
const decayRate = 0.1;  // heat transfer speed : >0

const timerDelay = 1000;  // (ms)
const tickTime = 3000;  // (ms)

const Container = styled.div`
  margin: 20px 0;
  display: grid;
  gap: 2px;
  justify-content: center;

  grid-template-columns: repeat(${gridSize}, ${gridWidth/gridSize}px);
  grid-template-rows: repeat(${gridSize}, ${gridWidth/gridSize}px);
  `

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}

interface LatticeGridProps {
  pick: string,
  setHistory: (history: LogSchema[]) => void,
  setAverageColor: (averageColor: string) => void
}

type Vector = number[];
type GridItem = Vector[];

// Basic operations
const index_to_xy = (index: number) => {  // index = x*gridSize + y
  return {
    x: Math.floor(index / gridSize),
    y: index % gridSize
  }};
const xy_to_index = (x: number, y: number) => x*gridSize + y;

const rgbToHex = (rgbArr: number[]) => '#' + rgbArr.map(x => {
  const hex = Math.floor(x).toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('');

const hexToRgb = (hex: string) => {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)!
    .map(x => parseInt(x, 16))
}

// execute given function to all adjacent pixels
function doAdjacent(pivot: number, targetFunction: (index: number) => void = () => null, targetCondition: (index: number) => boolean = () => true) {
  const {x, y} = index_to_xy(pivot);

  const dx = [- 1, 0, 1, - 1, 1, - 1, 0, 1];
  const dy = [- 1, - 1, - 1, 0, 0, 1, 1, 1];
  
  let flag: boolean = true;
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
const Adj_arr: number[][] = Array(N * N).fill(null).map((e) => Array(N * N).fill(0)); // (N*N) * (N*N) 2D Array
//const Adj = math.zeros(N * N, N * N);

for(let i = 0; i < N*N; i++) {
  doAdjacent(i, (index) => {
    Adj_arr[i][index] = 1;
  })
}

const Adj = math.matrix(Adj_arr);
//const Deg = math.diag(math.sum(Adj, 1));
const Deg = math.diag(Adj_arr.map((row) => math.sum(row)));
const L = math.subtract(Deg, Adj);

const eigen = math.eigs(L);
const V = eigen.vectors;  // matrix of eigenvectors
const D = eigen.values;  // column vector with eigenvalues

const transform = (x: number[], dt: number, k: number) => {
  //let x = math.reshape(matrix, N);  // matrix to 1D vector
  let Vx = math.multiply(math.transpose(V), x);

  let Phi = math.dotMultiply(math.map(D, (x) => math.exp(-k*dt*x)), Vx);
  Phi = math.multiply(V, Phi);
  //Phi = math.reshape(Phi, [N, N]);
  Phi = (Phi as math.Matrix).toArray();
  return Phi as number[];
}


// Vector operations
const blackVector = [0, 0, 0];
const threshold = 100;  // color vector (R,G,B) similarity threshold

const similarity = (u: Vector, v: Vector) => math.distance(u,v);  // Euclidian similarity
const isSimilar = (u: Vector, v: Vector) => similarity(u,v) < threshold;

const convergeTo: (vector: Vector, pivotVector: Vector, convergeRate: number)=>Vector
  = (vector, pivotVector, convergeRate) => {
  // convergeRate should be 0(doesn't converge) ~ 1(converge at once).
  let u = math.multiply(pivotVector, convergeRate);
  let v = math.multiply(vector, 1-convergeRate);

  return math.add(u, v) as Vector;
}

// gather adjacent pixel vectors into center(pivot) pixel
const gather = (pivot: number, item: GridItem) => {
  doAdjacent(pivot, (index) => {
    item[index] = convergeTo(item[index], item[pivot], convergeRate) // (target vector, pivot vector, conv rate)
  })
}

const generateRandomPixel = (item: GridItem) => {
  const randIndex = math.randomInt(0, gridSize * gridSize);

  if(isSimilar(item[randIndex], blackVector)) {
    if(doAdjacent(randIndex, ()=>null, (index) => 
      isSimilar(item[randIndex], item[index])
      )) {
      item[randIndex] = math.random([3], 0, 256);
      gather(randIndex, item);

      return true;
    }
  }
  return false;
}


// main
const LatticeGrid = ({ pick, setHistory, setAverageColor }: LatticeGridProps) => {
  const [ clicked, setClicked ] = useState<number>(-1);
  const [ item, setItem ] = useState<GridItem>(Array(gridSize * gridSize).fill(blackVector));

  const copyItem = (item: GridItem) => item.filter(() => true);

  const [ timer, setTimer ] = useState<number>(0);

  const tick = () => {
    setTimer(timer => timer + 1);
    
    const sumItemVectors = item.reduce(
      (previous, vector) => previous.map((e, i) => e + vector[i]),
      blackVector
    );
    const averageVector = sumItemVectors.map((x) => Math.floor(x/(gridSize * gridSize)));
    
    setAverageColor(rgbToHex(averageVector));
    
    if(timer === tickTime/timerDelay) {
      const newItem = copyItem(item);

      if (generateRandomPixel(newItem)) {
        setItem(newItem);
        //setTimer(0);
      }
    }
    if(timer >= 2*tickTime/timerDelay) {
      const itemMatrix:number[][] = [];
      for(let i = 0; i < 3; i++) {
        let componentVector = item.map((vector) => vector[i]);
        componentVector = transform(componentVector, timerDelay/1000, decayRate);
        itemMatrix.push(componentVector);
      }

      const newItem = item.map((vector, i) => vector.map((element, j) => itemMatrix[j][i]));

      setItem(newItem);
    }
    if(timer >= 3*tickTime/timerDelay) {
      setTimer(0);
    }
    
    //console.log(timer);
  }

  useInterval(tick, timerDelay);

  useEffect(() => {
    if(clicked !== -1) {
      if(timer < 1) { // ignore inputs during 1 timerDelay after previous input
        setClicked(-1);
      } else {
        const newItem = copyItem(item);
        if(pick) {  // pick is not ''
          newItem[clicked] = hexToRgb(pick);
          APILogAction(clicked, pick, (log) => setHistory(log));
        } else {
          APILogAction(clicked, rgbToHex(item[clicked]), (log) => setHistory(log));
        }
        gather(clicked, newItem);
  
        setItem(newItem);
        setTimer(0);
        setClicked(-1);
      }
    }
  }, [clicked]);  // eslint-disable-line react-hooks/exhaustive-deps

  /*useEffect(() => {
    console.log(pick);
  }, [pick])*/
  
  return (
    <Container>
      {
        item.map(( vector, index ) => <Pixel key={index} index={index} vector={vector} setClicked={setClicked} />)
      }
    </Container>
  );
};

export default LatticeGrid;
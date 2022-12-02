import React from 'react';
import Plot from 'react-plotly.js';

interface LogSchema {
  index: number,
  color: string,
  timestamp: string
}

interface DataPlotProps {
  data: LogSchema[]
}

const hexToRgb = (hex: string) => {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)!
    .map(x => parseInt(x, 16))
}

const DataPlot = ({ data }: DataPlotProps) => {
  const colorData = data.map((x) => hexToRgb(x.color));

  return (
    <div className='content-plot' style={{margin: '25px auto'}}>
      <Plot
        data={[{
          x: colorData.map((x) => x[0]),
          y: colorData.map((x) => x[1]),
          z: colorData.map((x) => x[2]),
          mode: 'markers',
          type: 'scatter3d',
          marker: {
            color: 'rgb(23, 190, 207)',
            size: 2
          }
        }, {
          opacity: 0.1,
          type: 'mesh3d',
          x: colorData.map((x) => x[0]),
          y: colorData.map((x) => x[1]),
          z: colorData.map((x) => x[2])
        }]}
        layout={ {
          autosize: true,
          title: 'User History Data',
          
          width: 600,
          height: 600,
          scene: {
            aspectratio: {
              x: 1,
              y: 1,
              z: 1
            },
            camera: {
              center: {
                x: 0,
                y: 0,
                z: 0
              },
              eye: {
                x: 1.25,
                y: 1.25,
                z: 1.25
              },
              up: {
                x: 0,
                y: 0,
                z: 1
              }
            },
            xaxis: {
              title: 'R',
              range: [0, 255],
              type: 'linear',
              zeroline: false
            },
            yaxis: {
              title: 'G',
              range: [0, 255],
              type: 'linear',
              zeroline: false
            },
            zaxis: {
              title: 'B',
              range: [0, 255],
              type: 'linear',
              zeroline: false
            }
          }
        } }
      />
    </div>
    
  );
}

export default DataPlot;
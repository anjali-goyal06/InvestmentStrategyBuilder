import React from 'react'
import makeplot from "./plots"
import Chart from 'react-google-charts'

export const Plot = (props) => {
    let scatterData = [
        ['Price', 'Profit'],
      ]
      
      var coordinates = props.coordinates;
  
      for(let i in coordinates.xCoords){
        scatterData.push([coordinates.xCoords[i], coordinates.yCoords[i]]);
      }
      let scatterOptions = {
        title: 'Price of Underlying vs. Profit',
        hAxis: { title: 'Price', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Profit', minValue: 0, maxValue: 15 },
        legend: 'none'
      }
  return (
    <div style={{marginLeft:"5px"}}>
        
        <Chart
          width={'70em'}
          height={'30em'}
          margin={'auto'}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={scatterData}
          options={scatterOptions}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
  )
}

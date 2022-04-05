import React from 'react'
import '../styles/StrategyCard.css'
import {Link,useLocation} from "react-router-dom";
import { Plot } from './Plot';
import { useState } from 'react';
import { useEffect } from 'react';



export const ViewStrategy =  (props) => {
    let location = useLocation();

    const makePlot = async(id) =>{
        const SavedStrategyImplementation = async (id) =>{
            try{
            const response = await fetch("http://localhost:8000/api/makeplot/id", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id : id})
              });
             var json = await response.json()
             
              return json
        }catch(err){
            alert(err)
        }
    }
    
     var data= await SavedStrategyImplementation(id)
     setDetails(data.values.listInstruments);

     var json = data.values
    console.log(json)
     var date = new Date(json.ExpiryDate);
     var d = date.toLocaleDateString()
     
     console.log(d)

     var common = {
        "Exchange" : json.StockName,
        "Ticker" : json.Ticker,
        "ExpiryDate" : d,
        "InstrumentSkeletonId" : json.InvestmentStrategySkeletonId,
        "Name" : json.Name,
        "Description" : json.Description,
        "DescriptionSkeleton" : json.DescriptionSkeleton,
        "StrategyName" : json.StrategyName

    }

    setCommon(common);
    setCoords(data.coords)
    
    }
    console.log()
    var str = (location.search && location.search.substring(1)) ? location.search.substring(1) : "0"; 
   
    const [details , setDetails] = useState([])
    const [commonValues,setCommon] = useState({
        "Exchange" : "",
        "Ticker" : "",
        "ExpiryDate" : "",
        "InstrumentSkeletonId" : "",
        "Name" : "",
        "StrategyName" : "",
        "DescriptionSkeleton" : "",
        "Description" : ""

    });
    const [_coords , setCoords] = useState({
        "xCoords" : [],
        "yCoords" : []
    });

    useEffect(async ()=>{
        var str = location.search.substring(1)
        await makePlot(str);
         console.log("after");
         console.log(commonValues);
    },[])

  
    
    return (
        <>
               <div class="card" id='view-card' style={{margin : "50px"}}>
              <h5 class="card-header">{commonValues.Name}</h5>
              <div class="card-body">
                <p class="card-title"><b>Strategy</b>: {commonValues.StrategyName}</p>
                <p class="card-text"> <b>Strategy Description</b> : {commonValues.DescriptionSkeleton}</p>
                <p class="card-text"> <b>Description</b> : {commonValues.Description}</p>
              </div>
            </div>

            <div style={{width:'85%',margin:"90px"}}>
                <table className='view-table'>
                    <thead>
                        <tr>
                            <th>Exchange</th>
                            <th>Ticker</th>
                            <th>Segment</th>
                            <th>Expiry</th>
                            <th>Side</th>
                            <th>Quantity</th>
                            <th>Strike</th>
                            <th>Premium</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail) => (
                            <tr>
                                <td>{commonValues.Exchange}</td>
                                <td>{commonValues.Ticker}</td>
                                <td>{detail.segment}</td>
                                <td>{commonValues.ExpiryDate}</td>
                                <td>{detail.Side}</td>
                                <td>{detail.Quantity}</td>
                                <td>{detail.StrikePrice}</td>
                                <td>{detail.Premium}</td>
                                <td>{detail.Type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <Plot coordinates= {_coords} vv="aaa"/>
            </div>
        </>
    )
}

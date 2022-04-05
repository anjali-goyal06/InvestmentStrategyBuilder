import React, { Component } from 'react'
import { ViewStrategy } from './ViewStrategy';
import '../styles/StrategyCard.css'
import { Link } from "react-router-dom"

export default class StrategyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.Implementation.Id,
      url : '/StrategyImplementations?' + this.props.Implementation.Id+ '',
      toggle: false,
      data :{}
    };
  }

   

   fetchData = async (id) => {
        console.log("getch")
    const SavedStrategyImplementation = async (id) =>{
        try{
        const response = await fetch("http://localhost:8000/api/send/savedImplementation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : id})
          });
         var json = await response.json()
        
          if (!json.err){ 
             return json
          }
          else{
            console.log(json);
            alert("Invalid !!");
          }
        }catch(err){
            alert(err)
        }
    }

    return await SavedStrategyImplementation(id);
}

 

clicked = async () => {
   console.log("clicked" + this.state.toggle)
  

  if(true && !this.state.toggle){

  }
  this.setState({ toggle: !(this.state.toggle) })
}

  render() {

    var implementation = this.props.Implementation;
    // this.setState({id : implementation.Id})
    
  
    return (
        <>

            <div class="card" id='view-card' onClick={this.clicked}>
              <h5 class="card-header">{implementation.Name}</h5>
              <div class="card-body">
                <h5 class="card-title">.</h5>
                <p class="card-title"><b>Strategy</b>: {implementation.StrategyName}</p>
                <p class="card-text"> <b>Strategy Description</b> : {implementation.DescriptionSkeleton}</p>
                <p class="card-text"> <b>Description</b> : {implementation.Description}</p>
                <p class="card-text"> <b>Stock</b> : {implementation.StockName}</p>
                <p class="card-text"> <b>Ticker</b> : {implementation.Ticker}</p>
                <Link to={this.state.url}><button type="button" class="btn btn-outline-secondary">
                Link
                </button>
                </Link>
              </div>
            </div>
            
            {/* {

               <ViewStrategy x={this.state.id} Data={this.state.data}/>
            } */}
            <br/>
        </>
      
    )
  }
}



import React, { Component } from 'react'
import StrategyCard from './StrategyCard';


export default class AllImplementationsData extends Component {

  constructor(){
    super();
    this.state = {
      implementationsData : []
    }
  }

  

  async componentDidMount(){
      const url=  "http://localhost:8000/api/send/allSavedImplemenations"
      
      const response = await fetch(url , {
        method  : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      });

      const json  = await response.json();

    this.setState({implementationsData : json});
    console.log(json);
  }

  render() {
    return (
      <>
      <div className='allImplementations'>
      <h1 className='all-imp'> Strategy Implementations </h1>

        <div >            
            <div>
              {this.state.implementationsData.map((element)=>{
                return <div key={element.Id}>
                      <StrategyCard Implementation={element}/>
                   </div> 
              })}
            </div>
        </div>
              </div>
      </>
    )
  }
}


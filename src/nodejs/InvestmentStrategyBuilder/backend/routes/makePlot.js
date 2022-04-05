/**
 * This file contains the API for making and returning plot of a praticular strategy whenever requested (with
 *  strategy data) at the make plot endpoint.
 */

const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser')

const InvestmentStrategy = require('../model/InvestmentStrategy');
const InstrumentManager = require('../model/InstrumentManager')


/**
 * Making the plot for the investment strategy whose details are provided in the request body.
 * It also calculates the starting x coordinate for the combined plot.
 * @returns the combined plot, basically x & y coordinates of the plot as response
 */
router.post('/',async(req, res)=>{
 
  var response = await makePlot(req.body)
  res.send(response);
  
});


  router.post('/id' , async (req,res) =>{
    var id = (req.body.id) ? (req.body.id) : 2;
    var investmentStrategy1 = new InvestmentStrategy();
    var response = await investmentStrategy1.fetchDetailedStrategyImplementationFromDbForUser(id);
    var result =await makePlot(response);

  var r = {
    "values" : response,
    "coords" : result
  }
  return res.send(r)
})
  
/**
 * Making the plot for the investment strategy whose details are provided in the request body.
 * It also calculates the starting x coordinate and range for the combined plot.
 * @param data - request body containing strategy details
 * @returns the combined plot, basically x & y coordinates of the plot as response
 */
const makePlot = async (data) => {

      //Creating investment strategy object
      var investmentStrategy = await new InvestmentStrategy(-1, data.StockName, data.Ticker, -1, data.ExpiryDate, data.Name, -1, data.Description);
      var instrumentManager = await new InstrumentManager();
  
    /** 
    * Average value of the price/strike price of instrument is used for defining the starting x coordinates and 
    * range of plot 
    * Price is used in case of future and stock and Strike price is used in case of Options to calculate average 
    */

      //variable for the storing sum of prices/strike prices of instrument
      let sum = 0; 

      for(var i=0; i<data.listInstruments.length; i++){
        var instrument = data.listInstruments[i];
  
        if(instrument.segment.toLowerCase() == "option"){
        sum = sum + parseInt(instrument.StrikePrice);
        }else{
        sum = sum + parseInt(instrument.Price);
        }
    
        //creating appropriate instrument object using instrument manager and adding to investment strategy object
        var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side, instrument.Premium);
        investmentStrategy.instruments.push(_instrument);
      }
  
      
      let total = data.listInstruments.length;
      let t = Math.floor(total);
    
    //store the average value of strike price/price of instrument
      let average = Math.floor(sum/t);
  
      //Average value of price/strike price of instrument is used for deciding the range of coordinates of plot
      let range = 2*average;

      //Limit the range to 400, if it exceeds 400
      if(range > 400) range = 400;

      //Based on the range and average value, define the starting x coordinate of plot
      let startCoord = average - (range/2);
      startCoord = Math.floor(startCoord);
      range = Math.floor(range);
  
      //If startcoord is negative, set it to 0
      if(startCoord<0) startCoord = 0;
      console.log("startcoords = " + startCoord);
      console.log("range = " + range);
  
      //Making the combined plot and passing the range and start x coordinate as parameter
      var plot = await investmentStrategy.combinedPlot(startCoord, range);
    
      //returning the plot as response
      var response = plot;
      console.log(response)
      return response
}


  module.exports = router

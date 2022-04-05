/**
 * This file contains the definition of Stock class.
 */
var getDbConnection = require('../db/dbconnect');
import StrategyPlot from './StrategyPlot';
var Instrument =  require('./Instrument');
const DbManager = require('./DbManager');
const Constants = require('./Constants');
import DbManager_ from './DbManager';
var StrategyPlot_ = require('./StrategyPlot')

/**
 * Stock is one of the financial instruments being used in the application. Stock class holds the information 
 * of the Stock instrument in its objects. It is derived from the instrument class. 
 */
export default class Stock extends Instrument{

    price : number;

    /**
     * This is the constructor for Stock class. It takes in the following params and sets the data members of class.
     * @param id 
     * @param quantity 
     * @param price 
     * @param side 
     */
    constructor(id:number, quantity:number, price:number, side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.side = side;
    }

     
  /**
   * Inserts the stock object in stock table.
   * @param instrumentSkeletonId 
   * @param strategyId - id of strategy to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){
        
        
        var sql = "INSERT INTO Stock (Price, Quantity, StockSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?)";

        try{

            //get the connection to database
            const connection = await getDbConnection()

            //run the query and get the response
            var response = await connection.query(sql, [this.price, this.quantity, instrumentSkeletonId, strategyId]);
            
            //close the connection
            connection.end()
            //set the id to object to its id in database
            this.id = response.insertId;
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }

    /**
     * To make plot for stock instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param range - range of plot coordinates
     */
    makePlot(xStart, range) {
      
        //set the start coordinate of x
        var x = Math.floor(xStart);
        var y;
       
        this.plot = new StrategyPlot_();

        var multiplier = 0;

        //two cases handled - buy and sell
        if(this.side.toLowerCase() == Constants.Buy){
            multiplier = 1;
        }else if(this.side.toLowerCase() == Constants.Sell){
            multiplier = -1;
        }else{
            //invalid case
            console.log("Invalid Case");
            multiplier = NaN;
        }

        //loop over the range and calculate y coordinate 
        for(var i=0;i<range;i++){

            this.plot.xCoords.push(x);
            y = (multiplier)*(this.quantity*(x - this.price));
            this.plot.yCoords.push(y);

            x++;
        }
       // return this.plot;
    }

    /**
     * Getter for plot
     * @returns plot of stock instrument
     */
    getPlot(): StrategyPlot {
        return this.plot;
    }
}


module.exports = Stock;
/**
 * This file contains the definition of Options class.
 */

var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
import OptionSkeleton from './OptionSkeleton';

import { time } from "console";
var Instrument = require('./Instrument');
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
const Constants = require('./Constants');

/**
 * Options is one of the financial instruments being used in the application. Options class holds the information 
 * of the options instrument in its objects. It is derived from the instrument class. 
 */
export default class Options extends Instrument{

    strikePrice : number;
    premium : number;
    currentPriceStock: number;
    type : string;

    /**
     * This is the constructor for Options class. It takes in the following params and sets the data members of class.
     * @param id 
     * @param quantity 
     * @param strikePrice 
     * @param type 
     * @param side 
     * @param premium 
     */
    constructor(id:number, quantity:number, strikePrice:number,  type:string, side:string, premium:number){
        super()
        this.id = id;
        this.quantity = quantity;
        this.strikePrice = strikePrice;
        this.premium = premium;
        this.side = side;
        this.type = type;
    }

    setSkeleton(obj : OptionSkeleton){
        this.instrumentSkeleton = obj;
        this.instrumentSkeletonId = obj.id;
    }

    
   
  /**
   * Inserts the options object in options table.
   * @param instrumentSkeletonId 
   * @param strategyId - id of strategy to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){

            
        var sql = "INSERT INTO Options (StrikePrice , Premium, Quantity, OptionSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?)";

        try{

            //connect to db, run the query and set the id of object to its id in database
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.strikePrice, this.premium, this.quantity, instrumentSkeletonId, strategyId]); 
            connection.end()
            this.id = response.insertId;
            return response;

        }catch(err){
            console.log(err);
            return err;
        }

    }


   /**
     * To make plot for option instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param range - range of plot coordinates
     */
    makePlot(xStart, range){

      //sets starting x coordinate of plot
        var x = Math.floor(xStart);
        var y;

        this.plot = new StrategyPlot_();

        var str = this.side.toLowerCase() + " " + this.type.toLowerCase();
       
      
        //handles 4 cases - BUY CALL, SELL CALL, BUY PUT , SELL PUT
        switch(str){

            case Constants.BuyCall : {

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<range;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.max(x, this.strikePrice);
                    y = this.quantity*((x2-this.strikePrice) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
                break;
            }

            case Constants.BuyPut : {

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<range;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.min(x, this.strikePrice);
                    y = this.quantity*((this.strikePrice -x2) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
                break;
            }

            case Constants.SellCall : {

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<range;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.max(x, this.strikePrice);
                    y = -1*this.quantity*((x2-this.strikePrice) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
                break;
            }

            case Constants.SellPut :{

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<range;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.min(x, this.strikePrice);
                    y = -1*this.quantity*((this.strikePrice -x2) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
            }

        }
        
    }

    /** 
    * Returns the plot.
    * Parameters - None
    * @returns - Plot (StrategyPlot type)
    */
    getPlot(): StrategyPlot {
        return this.plot;
    }

}


module.exports = Options;


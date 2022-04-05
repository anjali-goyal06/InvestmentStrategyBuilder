/**
 * This file contains the definition for Investment Strategy class.
 */
var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
import IInstrument from './IInstrument';
var DbManager = require('./DbManager');
var StrategyPlot_ = require('./StrategyPlot');

/**
 * This class is used for holding strategy implementations in its objects.
 * Strategy Implementation refers to the complete snapshot of a strategy (with specific values) having full details -
 * 1. Stock it is implemented on, its expiry date, name, description
 * 2. Complete details of the instruments it has (price of instrument, quantity, type, side etc) 
 */
export default class InvestmentStrategy{

    id : number;
    stockName : string;
    ticker : string;
    currentStockPrice : Float32Array;
    userId : number;
    expiryDate : Date;
    plot : StrategyPlot;
    name:string;
    strategySkeletonId:number;
    description : string;
    instruments : IInstrument[];
    xStart : number;

    /**
     * This is the constructor for Investment Strategy class. It takes in the following params and sets the data members of class.
     * @param id 
     * @param stockName 
     * @param ticker 
     * @param userId 
     * @param expiryDate 
     * @param name 
     * @param strategySkeletonId 
     * @param description 
     */
    constructor(id:number, stockName:string, ticker:string, userId:number, expiryDate:Date, name:string, strategySkeletonId:number, description:string){
        this.id = id;
        this.stockName = stockName;
        this.ticker = ticker;
        this.userId = userId;
        this.expiryDate = expiryDate;
        this.name = name;
        this.strategySkeletonId = strategySkeletonId;
        this.description = description;
        this.instruments = [];
        this.plot = new StrategyPlot_();
        this.plot.xCoords = [];
        this.plot.yCoords = [];
        this.xStart = 0;
    }
  

    
   /**
    * Returns the strategy plot
    * Parameter - None
    * @returns Plot (StrategyPlot type)
    */
    getPlot() : StrategyPlot{
        return this.plot;
    }

   /**
    * Makes the combined plot of the strategy from the plots of the instruments it has.
    * @param startCoord - Starting x coordinate of the plot, type - number
    * @param range - range of plot coordinates
    * @returns combined plot
    */
    async combinedPlot(startCoord, range){

       //setting starting coordinate
       this.xStart = startCoord;

       var FirstIteration = true;

       //for each instrument in the strategy
        for(let k in this.instruments){
            
            
            //calculate the instrument plot
            await this.instruments[k].makePlot(this.xStart, range);
            let tempPlot = await this.instruments[k].getPlot();

            //If this is the first iteration of loop, then set combined plot's coordinate values to zero
            if(FirstIteration){
                for(let i in tempPlot.xCoords){
                    this.plot.yCoords.push(0)
                    this.plot.xCoords.push(0)
                }
            }
           
           // add instrument plot values to combined plot of strategy
            for(let i in tempPlot.xCoords){
                this.plot.xCoords[i] = tempPlot.xCoords[i]
                this.plot.yCoords[i] += tempPlot.yCoords[i];
            }
            FirstIteration = false;
        }
        return this.plot;
    }


   /**
    * Getter for strategy id
    * Parameters - None
    * @returns Id (integer)
    */
    getId() : number {
        return this.id;
    }


    
  /**
   * Inserts the investment strategy object in investment strategy table.
   * Parameters - None
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(){
        
        var sql = "INSERT INTO InvestmentStrategy (Name , StockName, Ticker, ExpiryDate, UserId, Description, InvestmentStrategySkeletonId) VALUES (?,?,?,?,?,?,?)";
       
        try{
            //connect to db, run the query and set the id of object to its id in database
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.name, this.stockName, this.ticker, this.expiryDate, this.userId, this.description, this.strategySkeletonId]); 
            connection.end()
            this.id = response.insertId;
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }

    
   /**
    * Fetches all the saved strategies for a given user id from investment strategy table. 
    * @param userId 
    * @returns Query Response containing the saved strategies record in json object
    */
    async fetchAllStrategyImplementationFromDBForUser(userId){
        var db = await new DbManager();
        var arrStrategy =  await db.GetSavedStrategiesFromUserId(userId);
        console.log(arrStrategy);
       
        return arrStrategy;
    }

    /**
     * Fetches the complete strategy skeleton (with instrument skeletons) of given strategy skeleton id
     * @param strategySkeletonId - strategy skeleton id 
     * @returns a json object having strategy skeleton details and list of all the instrument skeletons it has
     */
    async fetchDetailedStrategySkeletonFromDbForUser(strategySkeletonId){
        var db = await new DbManager();

        //fetch startegy skeleton details from skeleton id 
        var skeleton = await db.GetStrategySkeletonsFromSkeletonId(strategySkeletonId)

        //fetch instrument skeletons from strategy skeleton id
        var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategySkeletonId);
        var response = skeleton[0];
        console.log(listInstrumentSkeleton);
        console.log(response);
        response.listInstrumentSkeleton = listInstrumentSkeleton;
        return response;
    }

    /**
     * Fetches the complete strategy implementation (with all its instruments) of given strategy id
     * @param strategyId - strategy id
     * @returns a json object having strategy details and list of all the instruments it has
     */
    async fetchDetailedStrategyImplementationFromDbForUser(strategyId){

        try{
            var db = await new DbManager();

            //get strategy record from strategy id
            var strategy = await db.fetchStrategyFromStrategyId(strategyId);
            console.log("line 202" + strategy);
        
            
            var strategySkeletonData = await db.GetStrategySkeletonsFromSkeletonId(strategy[0].InvestmentStrategySkeletonId)
            //fetch list of instrument skeletons of given strategy
            var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategy[0].InvestmentStrategySkeletonId);
            console.log(listInstrumentSkeleton);
            console.log(strategySkeletonData)
            var listInstrument = [];

            //for each instrument skeleton in the list
            for(let j in listInstrumentSkeleton){
                
                //fetch instrument record from database
                var input = await db.getUserInputFromStrategySkeletonIdAndStrategyId(listInstrumentSkeleton[j].segment,listInstrumentSkeleton[j].Id,strategyId)
        
                //adding skeleton information to instrument record and pushing it to instrument array
                listInstrument.push(this.AddSkeleton(input[0],listInstrumentSkeleton[j]));
            }

            console.log("list of instruments : ")
            console.log(listInstrument);

            var result = strategy[0];
            result.StrategyName = strategySkeletonData[0].StrategyName ;
            result.DescriptionSkeleton = strategySkeletonData[0].Description;
            result.listInstruments = listInstrument;
            console.log(result);
            return result;
        }catch(err){
            console.log(err)
            return err;
        }
    }
    
    /**
     * It combines the data of instrument skeleton table and instrument table into a complete instrument object
     * @param x - record of instrument table. It has values (price, quantity, strike price/price etc) but does not have skeleton information (side, type) of instruments
     * @param y - record of instrument skeleton table. It has skeleton information but not values.
     * @returns complete instrument object (with values and skeleton information both) in json format
     */
    AddSkeleton(x,y){
        let a = x;
        console.log("input 0")
        console.log(x);
        
        a.StrikePrice = x.StrikePrice;
        a.Premium = x.Premium;
        a.Price = x.Price;
        a.Side = y.Side;
        a.Type = y.Type;
        a.InstrumentSkeletonId = y.Id;
        a.segment = y.segment;

        if(x.OptionSkeletonId) a.SkeletonId = x.OptionSkeletonId;
        else if(x.FutureSkeletonId) a.SkeletonId = x.FutureSkeletonId;
        else a.SkeletonId = x.StockSkeletonId;
        return a;
    }

}

module.exports = InvestmentStrategy;




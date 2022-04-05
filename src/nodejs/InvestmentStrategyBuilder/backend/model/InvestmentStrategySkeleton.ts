/**
 * This file contains the definition of Instrument Skeleton class.
 */
import { validationResult } from "express-validator";
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

/**
 * This class is used for holding the skeleton of strategies inside its objects.
 * 
 * A strategy skeleton is the term we have used for denoting only the structural information of a strategy, not its values.
 * For e.g. - A married put strategy refers to buying a stock and simultaneously buying a put option for that stock.
 * So, skeleton of married put will only have the following info-
 * 1. Strategy Name, Description 
 * 2. One Option instrument, type = put, side = buy
 * 3. One stock instrument, side = buy
 *
 * While a strategy implementation has complete information - strategy skeleton + values (ticker, expiry date, quantity, strike price or price of instrument etc)
 * 
 * This class has mainly been used to model the strategy skeleton information into an object while adding it or fetching it to/from database.
 */

export default class InvestmentStrategySkeleton{
    id : number;
    strategyName : string;
    userId : number;
    description : string;

    /**
     * This is the constructor for InvestmentStrategySkeleton class. It takes in the following params and sets the data members of class.
     * @param id 
     * @param strategyName 
     * @param userId 
     * @param description 
     */
    constructor(id:number, strategyName:string, userId:number, description:string){
       
       this.id = id;
       this.strategyName = strategyName;
       this.userId = userId;
       this.description = description;
    }

    
    /*
    Getter for strategy skeleton id
    Parameters - None
    Return Value - Id (integer)
    */
    getId() : number {
        return this.id;
    }


    /** 
   * Inserts the investment strategy skeleton object in investment strategy skeleton table.
   * Parameters - None
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(){
        
        var sql = "INSERT INTO InvestmentStrategySkeleton (StrategyName , Description, UserId) VALUES (?,?,?)";
        
        try{
            //connect to db, run the query and set the id of object to its id in database
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.strategyName, this.description, this.userId]); 
            connection.end()
            this.id = response.insertId;
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }
}

module.exports = InvestmentStrategySkeleton;
/**
 * This file contains the definition of Option Skeleton class.
 */
const { validationResult } = require("express-validator");
var getDbConnection = require('../db/dbconnect');
import InstrumentSkeleton from './InstrumentSkeleton';

const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

/**
 * A Option Skeleton only contains the structural information of a option instrument without its specifying values (strike price, ticker, quantity, premium etc).
 * For e.g. A option contract consists of premium of contract, quantity, side, ticker, expiry date etc.
 * But Option Skeleton only holds its side and type information i.e. -
 * Option Skeleton = (type -> put or call) and (side -> buy or sell)
 * 
 * This class holds option skeleton information in its objects.
 */

export default class OptionSkeleton extends InstrumentSkeleton{
   
    type : string;

    /**
     * This is the constructor for OptionSkeleton class. It takes in the following params and sets the data members of class.
     * @param id 
     * @param side 
     * @param type 
     */
    constructor(id:number, side:string, type:string){
        super();
        this.id = id;
        this.side = side;
        this.type = type;
    }
    
    /**
     * Getter for option skeleton id
     * @returns Id of option skeleton (integer)
     */
    getId() : number {
        return this.id;
    }
    
  
  /**
   * Inserts the option skeleton object in option skeleton table.
   * @param StrategySkeletonId - Id of the strategy skeleton (integer) to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(StrategySkeletonId:number){

         
        var sql = "INSERT INTO OptionSkeleton (Type , Side, InvestmentStrategySkeletonId) VALUES (?,?,?)";
       
        try{

            //connect to db, run the query and set the id of object to its id in database 
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.type, this.side, StrategySkeletonId]); 
            connection.end()
            this.id = response.insertId;
            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
   
}

module.exports = OptionSkeleton
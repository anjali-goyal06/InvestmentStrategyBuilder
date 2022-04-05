/**
 * This file contains the definition of Future Skeleton class.
 */

var getDbConnection = require('../db/dbconnect');
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
import InstrumentSkeleton from './InstrumentSkeleton';

/**
 * A Future Skeleton only contains the structural information of a future instrument without specifying values (price, ticker, quantity etc).
 * For e.g. A future contract consists of price of contract, quantity, side, ticker, expiry date etc.
 * But Future Skeleton only holds its side information i.e. whether it is a buy or sell contract.
 * 
 * This class holds future skeleton information in its objects.
 */
export default class FutureSkeleton extends InstrumentSkeleton{


    /**
     * This is the constructor for FutureSkeleton class. It takes in the following params and sets the data members of class.
     * @param id 
     * @param side 
     */
    constructor(id:number, side:string){
        super();
        this.id = id;
        this.side = side;
    }

    /**
     * Getter for future skeleton id
     * @returns id (integer)
     */
    getId() : number {
        return this.id;
    } 
    

  /**
   * Inserts the future skeleton object in future skeleton table.
   * @param StrategySkeletonId - Id of the strategy skeleton (integer) to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(StrategySkeletonId:number){
                
        var sql = "INSERT INTO FutureSkeleton (Side, InvestmentStrategySkeletonId) VALUES (?,?)";

        try{
            //connect to db, run the query and set the id of object to its id in database
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.side, StrategySkeletonId]) ; 
            connection.end()
            this.id = response.insertId;
            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
       
}

module.exports = FutureSkeleton;
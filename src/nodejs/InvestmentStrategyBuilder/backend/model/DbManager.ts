/**
 * This file contains the definition of DbManager Class. DbManager class manages the database operations with its functions.
 */

import { Context } from "express-validator/src/context";

var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');
const Constants = require('./Constants');

/**
 * This class is a manager class for database.
 * It wraps most of the sql queries needed to fetch data from db and insert data in db in its functions.
 * These functions are then used whenever required with the help of object of this class.
 */
export default class DbManager{

    constructor(){

    }

  
  /**
   * To fetch the record of given user from user table in database
   * @param id - User Id (Integer)
   * @returns - Sql Record corresponding to given user id in form of json object
   */
    async GetUserDetailsFromUserId(id){

        var sql = "Select  * from  User where Id = " + mysql.escape(id);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            console.log(response)
            return response;
        }catch(err){
            return err;
        }
        
    }

    

  /**
   * To fetch the instrument skeleton records of a particular strategy skeleton from database.
   * @param id - strategy skeleton id
   * @returns an array of all the instrument skeleton records 
   */
    async GetInstrumentsFromStrategySkeletonId(id){
        var response = [];

        //fetch the instrument skeleton records from all the skeleton tables
        var sqlOptions = "select * from OptionSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
        var sqlFutures = "select * from FutureSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
        var sqlStocks = "select * from StockSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);

        var arr;
        const connection = await getDbConnection()
        
        //Add the results from the option skeleton table into response array
        arr = await connection.query(sqlOptions) ; 
        console.log(sqlOptions);
        console.log(arr);
        for(let i in arr){
             arr[i].segment = Constants.Option;
             response.push(arr[i]);             
        }

         //Add the results from the future skeleton table into response array
        arr = await connection.query(sqlFutures) ; 
        for(let i in arr){
            arr[i].segment = Constants.Future;
            response.push(arr[i]);
        }

         //Add the results from the stock skeleton table into response array
        arr = await connection.query(sqlStocks) ; 
        for(let i in arr){
            arr[i].segment = Constants.Stock;
            response.push(arr[i]);
        }

        connection.end()
        return response;

    }


    /**
     * Fetches the instrument record from its instrument skeleton id and strategy id to which it belongs
     * @param segment - name of the instrument is given to fetch record from appropriate table
     * @param InstrumentId 
     * @param StrategyId 
     * @returns corresponding instrument record as response
     */
    async getUserInputFromStrategySkeletonIdAndStrategyId(segment,InstrumentId,StrategyId){
        
        //fetches instrument record from appropriate table
        if(segment=="option"){
            var sql = "select * from Options where OptionSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }else if(segment=="future"){
            var sql = "select * from Future where FutureSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }else{
            var sql = "select * from Stock where StockSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }
         
        console.log(sql);
        try{
            //connect to db, run the query and return the response received
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
    }


    /**
     * Fetches the strategy skeletons saved by a particular user from database
     * @param id - user id
     * @returns strategy skeleton records as response
     */
    async GetStrategySkeletonsFromUserId(id){

        var sql = "select Id, StrategyName from InvestmentStrategySkeleton where UserId = " + mysql.escape(id);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
        
    }

    /**
     * Fetch the strategy skeleton record for the specified skeleton id
     * @param id - Strategy Skeleton Id
     * @returns - Strategy skeleton record as response
     */
    async GetStrategySkeletonsFromSkeletonId(id){

        var sql = "select Id, StrategyName,Description from InvestmentStrategySkeleton where Id = " + mysql.escape(id);
        console.log(sql);
        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            
            console.log(response);
            return response;
        }catch(err){
            return err;
        }
        
    }

    /**
     * Fetches the strategy record for the specified strategy id
     * @param id - Strategy Id
     * @returns strategy record as response
     */
    async fetchStrategyFromStrategyId(strategyId){
        console.log(strategyId);
        var sql = "select * from InvestmentStrategy where InvestmentStrategy.Id =  " + mysql.escape(strategyId);
         try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            console.log(response)
            return response;
        }catch(err){
            return err;
        }
    }
    
    /**
     * Fetches all the strategies (with values) saved by a given user from database
     * @param id  user id
     * @returns strategy records as response
     */
    async GetSavedStrategiesFromUserId(id){
        var sql = "select Id, Name,StockName,Ticker,ExpiryDate,userId,Description, InvestmentStrategySkeletonId from InvestmentStrategy where InvestmentStrategy.userId =  " + mysql.escape(id);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
    }

    /**
     * To get the count of records in a particular table in database
     * @param tableName 
     * @returns sql query response in json format which has a count field
     */
    async GetCountOfRecordsInDb(tableName){
        
        var sql = "Select  count(*) as count from " + tableName;

        const connection = await getDbConnection();
        var response = await connection.query(sql) ; 
        connection.end()
        //let result = JSON.parse(JSON.stringify(response));

        return response;
    }
    
}


module.exports = DbManager;
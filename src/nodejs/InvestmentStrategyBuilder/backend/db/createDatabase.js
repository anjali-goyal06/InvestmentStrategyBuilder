/**
 * This file is for creating the database and running the database selection command so that all the future sql 
 * commands are run on the selected database. 
 */

var getDbConnection =require('./dbconnect.js');


const DatabaseCreation = async () =>{

    //get connection to the database
    const connection = await getDbConnection()

    //create database
    await connection.query("create database if not exists InvestmentStrategyBuilder") ; 

    //select database
    await connection.query("use investmentstrategybuilder");

    //close coonection
    connection.end()
}

DatabaseCreation()
module.exports = DatabaseCreation

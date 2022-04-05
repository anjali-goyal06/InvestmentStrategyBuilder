/**
 * This file is for creating connection to the database before being able to run any commands.
 */
 require("dotenv").config();
const { sanitize } = require('express-validator');
var mysql = require('promise-mysql');


var config = {
  host: "localhost",
  user: "root",
  password: "password",
  port : "3306",
  database : "investmentstrategybuilder"
}

/*
//connection configuration
var config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port : process.env.PORT,
  database : process.env.DATABASE
}*/

//creating the connection with the set configuration
const getDbConnection = async () => {
  return await mysql.createConnection(config);
}

module.exports = getDbConnection
//module.exports = connection;











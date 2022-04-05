/**
 * This class contains the definition for User class.
 */
 require("dotenv").config();
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var DbManager = require('./DbManager');
var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWTSECRET;

/**
 * User class holds user information in its objects. It has functions like add user and login user which helps in
 * driving the register and login logic.
 */
export default class User{
    
    id : number;
    name : string;
    email : string;
    password : string;

    /**
     * This is the constructor for User Class. It takes in the following params and sets the members of the object.
     * @param id 
     * @param name 
     * @param email 
     * @param password 
     */
    constructor(id:number, name: string , email : string , password : string){

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    
    /**
     * Adds user record in user table
     * @returns sql query response in case of successful insertion. 
     */
    async AddUser(){
  
        var sql = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
    
        //Password Encrypted before adding in db
        const salt = await bcrypt.genSalt(10);
        var secPass = await bcrypt.hash(this.password, salt);

        
        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.name , this.email , secPass] ) ; //,  function (err, result) {
            connection.end()
            this.id = response.insertId;
            const authtoken = jwt.sign({_id : this.id}, JWT_SECRET);
            response.authtoken = authtoken;
            return response;

        }catch(err){
            return err;
        }
    }

    /**
     * Fetches user record corresponding to given email
     * @returns User record as response
     */
    async LoginUser(){
        var sql = "Select  * from user where email = " + mysql.escape(this.email);

        const connection = await getDbConnection()
        var result = await connection.query(sql) ; 
        connection.end()

        var cnt = Object.keys(result).length;  
        if(cnt==0 || cnt>1){ 
            return { error: "Please try to login with correct credentials" };
        }

        // password matching 
        const passwordCompare = await bcrypt.compare(this.password, result[0].password);
        if (!passwordCompare) {
            return { error: "Please try to login with correct credentials" };
        }
        console.log(passwordCompare)

        const authtoken = jwt.sign({_id : result.id}, JWT_SECRET);
        result.authtoken = authtoken
        console.log(result);
        return result;

    }
}

 module.exports = User
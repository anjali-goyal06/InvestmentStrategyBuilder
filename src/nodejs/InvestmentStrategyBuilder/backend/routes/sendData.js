/**
 * This file contains APIs for fetching the requested data from the database and sending it as response to the user. 
 */

const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const InvestmentStrategy = require('../model/InvestmentStrategy');
const DbManager = require('../model/DbManager');
const fetchuser = require('../middleware/fetchUser')


 /**
  *  Given a strategy id, it fetches its implementation 
  * @returns strategy details and list of all the instruments it has as response in json format
  */
router.post("/savedImplementation" ,fetchuser, async (req,res) => {
    // var user = new User();
    var id= req.body.id;
    var investmentStrategy = new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategyImplementationFromDbForUser(id);
     res.send(response);
  })

  /**
   * Fetches the complete strategy skeleton (with instrument skeletons) of given strategy skeleton id
   * @returns strategy skeleton details and list of all the instrument skeletons it has as response
   */
  router.post("/savedSkeleton" ,fetchuser, async (req,res) => {
    var skeletonId = (req.body.skeletonId) ? req.body.skeletonId : 2;
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategySkeletonFromDbForUser(skeletonId);
    res.send(response);
  })

   /**
   * Fetches the skeletons of popular strategies from database i.e. the strategies saved by system user
   * @returns strategy skeleton records as response
   */
  router.get("/popularStrategy" ,fetchuser, async(req,res) =>{
    userId = 1;
    var db = await new DbManager();
    var popularStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(popularStrategies);
  })

  /**
   * Fetches the strategy skeletons saved by a particular user from database
   * @returns strategy skeleton records as response
   */
  router.get("/customStrategy" ,fetchuser, async(req,res) =>{
    var userId = (req.body.userId) ? req.body.userId : '2';
    var db = await new DbManager();
    var customStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(customStrategies);
  })


  /**
   * Fetches all the strategies (with values) that are saved by a given user
   * @returns fetched strategies as response
   */
   router.get("/allSavedImplemenations" ,fetchuser, async (req,res) =>{
    var userId = (req.body.userId) ? req.body.userId : 2;
      var db = await new DbManager();
      var response = await db.GetSavedStrategiesFromUserId(userId);

      for(let i in response){
        var skeleton = await db.GetStrategySkeletonsFromSkeletonId(response[i].InvestmentStrategySkeletonId);
        response[i].StrategyName = skeleton[0].StrategyName;
        response[i].DescriptionSkeleton = skeleton[0].Description
      }
     
      return res.send(response);

  })
  module.exports = router
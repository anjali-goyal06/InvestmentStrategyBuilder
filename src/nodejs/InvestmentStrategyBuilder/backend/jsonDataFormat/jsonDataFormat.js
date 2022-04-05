/**
 * This file describes the json object format in which request data is sent to backend and responses are 
 * sent to frontend. 
 * 
 * We defined a general json object which wraps all the details of strategy and its implementation in it. It contains 
 * all the information which is required to be exchanged between frontend and backend for the 3 main functionalities-
 * Make Plot, Save Strategy and Save Strategy Implementataion.
 * 
 * If any functionality does not require some keys in the object, then that key is sent with null value for that 
 * functionality.
 */

obj = {  
    "Ticker" : "AAPL",
    "ExpiryDate" : "2022-05-01",
    "isSkeletonSaved" : false, 
    "StrategyName" : "Custom Strategy 1",
    "Name" : "Strategy 8888",
    "StockName" : "XYZ",
    "InvestmentStrategySkeletonId" : 3,
    "Description" : "Strategy 8888 on aapl",
    "DescriptionSkeleton" : "Custom Strategy having all 3 instruments - Options, stock, future",
 
 "listInstruments" : [
        {"segment" : "option", "Side" : "buy", "Type" : "put" , "StrikePrice" : 70 , "Quantity" : 5, "Price" : null, "SkeletonId" : null , "Premium": 20},
        {"segment" : "future", "Side" : "sell", "Type" : null , "StrikePrice" : null , "Quantity" : 2, "Price" : 70, "SkeletonId" : null, "Premium": null},
        {"segment" : "stock", "Side" : "buy", "Type" : null , "StrikePrice" : null , "Quantity" : 1, "Price" : 75, "SkeletonId" : null, "Premium" : null}        
 ]
 }
 
 
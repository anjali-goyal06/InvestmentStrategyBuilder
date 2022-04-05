/**
 * This file contains the definition for Instrument Skeleton Manager class.
 */

import IInstrumentSkeleton from "./IInstrumentSkeleton";
var FutureSkeleton = require("./FutureSkeleton");
var OptionSkeleton  = require("./OptionSkeleton");
var StockSkeleton = require("./StockSkeleton");
const Constants = require('./Constants');

/**
 * It is the Manager Class for Instrument skeletons.
 * It has been used for implementing factory design pattern for creating appropriate instrument skeleton object. 
**/

export default class InstrumentSkeletonManager{

    constructor(){

    }


   /**
    * It creates and returns the appropriate instrument skeleton object.
    * @param instrumentType - specifies the type of instrument skeleton object to be created, type = string
    * @param type 
    * @param side 
    * @returns IInstrumentSkeleton type object of respective instrument skelton
    */
    createInstrument(instrumentType: string,  type:string, side:string) : IInstrumentSkeleton{
       if(instrumentType.toLowerCase() == Constants.Option){
           return new OptionSkeleton(-1, side, type);
       }else if(instrumentType.toLowerCase() == Constants.Future){
           return new FutureSkeleton(-1, side);
       }else {
           return new StockSkeleton(-1, side);
       }
    }
}

module.exports = InstrumentSkeletonManager;
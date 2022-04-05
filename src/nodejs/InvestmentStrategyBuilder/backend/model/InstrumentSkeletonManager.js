"use strict";
/**
 * This file contains the definition for Instrument Skeleton Manager class.
 */
exports.__esModule = true;
var FutureSkeleton = require("./FutureSkeleton");
var OptionSkeleton = require("./OptionSkeleton");
var StockSkeleton = require("./StockSkeleton");
var Constants = require('./Constants');
/**
 * It is the Manager Class for Instrument skeletons.
 * It has been used for implementing factory design pattern for creating appropriate instrument skeleton object.
**/
var InstrumentSkeletonManager = /** @class */ (function () {
    function InstrumentSkeletonManager() {
    }
    /**
     * It creates and returns the appropriate instrument skeleton object.
     * @param instrumentType - specifies the type of instrument skeleton object to be created, type = string
     * @param type
     * @param side
     * @returns IInstrumentSkeleton type object of respective instrument skelton
     */
    InstrumentSkeletonManager.prototype.createInstrument = function (instrumentType, type, side) {
        if (instrumentType.toLowerCase() == Constants.Option) {
            return new OptionSkeleton(-1, side, type);
        }
        else if (instrumentType.toLowerCase() == Constants.Future) {
            return new FutureSkeleton(-1, side);
        }
        else {
            return new StockSkeleton(-1, side);
        }
    };
    return InstrumentSkeletonManager;
}());
exports["default"] = InstrumentSkeletonManager;
module.exports = InstrumentSkeletonManager;

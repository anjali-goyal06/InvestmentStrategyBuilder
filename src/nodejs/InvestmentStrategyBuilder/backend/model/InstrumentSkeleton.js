"use strict";
/**
 * This file contains the definition of Instrument Skelton class. It implements Instrument Skelton inteface.
 */
exports.__esModule = true;
/**
 * This is the base class from which all the instrument skeleton classes have been inherited.
 * An instrument skeleton is the term we have used to denote only the structural information of an instrument.
 * For e.g. Consider an option instrument of type = put, side = buy, strike price = 70, premium = 10, quantity = 2.
 * Then option skeleton for this,  will have only type and side information, without any specification of price , quantity etc.
 * Option Skeleton = (type -> put or call) and (side -> buy or sell)
 */
var InstrumentSkeleton = /** @class */ (function () {
    function InstrumentSkeleton() {
    }
    return InstrumentSkeleton;
}());
exports["default"] = InstrumentSkeleton;

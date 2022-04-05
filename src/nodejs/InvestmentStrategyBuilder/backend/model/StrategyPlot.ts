/**
 * This file contains the definition of StrategyPlot class.
 * 
 * 
 * This class is used for holding plot information wrapped in one object.
 * It has two number arrays - one for the x-coordinates of plot and other for y-coordinates of plot.
 * 
 * It is being used in instrument classes and investment startegy class for storing their respective Profit and Loss 
 * plots.
 */
export default class StrategyPlot{

    xCoords : number[];
    yCoords : number[];

    /**
     * This is the constructor for StrategyPLot Class. It initialises the x and y coords with empty arrays.
     */
    constructor(){
        this.xCoords = [];
        this.yCoords = [];
    }
}

module.exports = StrategyPlot;
/**
 * This file contains the test cases for Make Plot function of InvestmentStrategy class. 
 */

const Constants = require('../model/Constants');
var InvestmentStrategy = require('../model/InvestmentStrategy');
var Stock = require('../model/Stock');
var Options = require('../model/Options');
var Future = require('../model/Future');

/**
 * It has been tested by creating an Investment Strategy containing one call option and one put option.
 */

test(Constants.StrategyGraph, async () => {

  
    var option1 = new Options(-1, 1, 180, "Call", "Buy", 50);
    var option2 = new Options(-1, 1, 200, "Put", "Buy", 40);

    var strategy = new InvestmentStrategy(-1, "ABC", "TCS", -1, "2022-06-08", "Strategy 88", -1, "Strategy made of one put option and one call option");
    strategy.instruments.push(option1);
    strategy.instruments.push(option2);

    let startCoord = 0;
    let range = 400;
    var plot = await strategy.combinedPlot(startCoord, range);
    
    var tempArr = {
      "x" : [0, 100, 150, 200, 250, 300, 350, 379],
      "y" : [110, 10, -40, -70, -20, 30, 80, 109]
    }
    var index=0;

    expect(plot.xCoords.length).toBe(plot.yCoords.length);

    for(let i in plot.xCoords){
        if(plot.xCoords[i]==tempArr.x[index]){
          expect(plot.yCoords[i]).toBe(tempArr.y[index])
          index++;
        }
    }
  });
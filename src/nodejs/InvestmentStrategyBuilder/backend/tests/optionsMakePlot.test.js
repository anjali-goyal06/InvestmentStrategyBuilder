/**
 * This file contains the test cases for Make Plot function of Options class. 
 */


const Constants = require('../model/Constants');
var Options = require('../model/Options');


/**
 * It has been tested against four category of cases - Buy Call, Buy Put , Sell Call and Sell Put Options
 */


test(Constants.BuyCallOptions, async () => {

    var id = -1;
    var quantity = 1;
    var strikePrice = 190;
    var side = "buy";
    var type = "call";
    var premium = 20;
  
    var option = new Options(id, quantity, strikePrice, type, side, premium);
    await option.makePlot(strikePrice-50, 100);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140,180, 215, 239],
      "y" : [-20, -20, 5, 29]
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

  
  test(Constants.BuyPutOptions, async () => {

    var id = -1;
    var quantity = 1;
    var strikePrice = 190;
    var side = "buy";
    var type = "put";
    var premium = 20;
  
    var option = new Options(id, quantity, strikePrice, type, side, premium);
    await option.makePlot(strikePrice-50, 100);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140, 155, 215, 239],
      "y" : [30, 15, -20, -20]
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

  test(Constants.SellCallOptions, async () => {

    var id = -1;
    var quantity = 1;
    var strikePrice = 190;
    var side = "sell";
    var type = "call";
    var premium = 20;
  
    var option = new Options(id, quantity, strikePrice, type, side, premium);
    await option.makePlot(strikePrice-50, 100);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140, 165, 215, 239],
      "y" : [20, 20, -5, -29]
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

  test(Constants.SellPutOptions, async () => {

    var id = -1;
    var quantity = 1;
    var strikePrice = 190;
    var side = "sell";
    var type = "put";
    var premium = 20;
  
    var option = new Options(id, quantity, strikePrice, type, side, premium);
    await option.makePlot(strikePrice-50, 100);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140, 160, 215, 239],
      "y" : [-30, -10, 20, 20]
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

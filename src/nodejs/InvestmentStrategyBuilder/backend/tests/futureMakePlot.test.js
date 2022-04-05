/**
 * This file contains the test cases for Make Plot function of Future class. 
 */


const Constants = require('../model/Constants');
var Future = require('../model/Future')


/**
 * It has been test against two category of cases - Buy Future and Sell Future
 */


test(Constants.BuyFuture, async () => {

    var id = -1;
    var quantity = 1;
    var price = 180;
    var side = "BUY";
  
    var future = new Future(id,quantity,price,side);
    await future.makePlot(price-50, 100);
    var plot = future.getPlot();
    
    var tempArr = {
      "x" : [130,150,180,220, 229],
      "y" : [-50,-30,0,40, 49]
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
  

  test(Constants.SellFuture, async () => {

    var id = -1;
    var quantity = 1;
    var price = 180;
    var side = "SELL";
  
    var future = new Future(id,quantity,price,side);
    await future.makePlot(price-50, 100);
    var plot = future.getPlot();
    
    var tempArr = {
      "x" : [130,150,185,220, 229],
      "y" : [50,30,-5,-40, -49]
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

  
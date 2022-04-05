/**
 * This file contains the test cases for Make Plot function of Stock class. 
 */

const Constants = require('../model/Constants');
var Stock = require('../model/Stock')


test(Constants.BuyStock,async () => {

    var id = -1;
    var quantity = 1;
    var price = 200;
    var side = "BUY";
  
    var stock = new Stock(id,quantity,price,side);
    await stock.makePlot(price-50, 100);
    var plot = stock.getPlot();
    
    var tempArr = {
      "x" : [150,175,200,225],
      "y" : [-50,-25,0,25]
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


  
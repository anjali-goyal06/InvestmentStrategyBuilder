const popularStrategyName = async () =>{
    const response = await fetch("http://localhost:8000/api/send/popularStrategy", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const jsonList = await response.json()
      console.log(jsonList);
      if (!jsonList.err){
        console.log("register Successfull")
      }
      else{
        console.log(jsonList);
        alert("Invalid !!");
      }
    
      var tempList = [];

    for(let i in jsonList){
        var insTemp = {
          "id" : jsonList[i].Id,
          "name" : jsonList[i].StrategyName
        }
        tempList.push(insTemp);
        console.log(insTemp);
    }
   
    return tempList;
     
}

    
module.exports = popularStrategyName








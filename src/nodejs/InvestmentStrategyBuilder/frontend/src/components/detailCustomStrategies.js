
const SavedSkeleton = async (id) =>{
const response = await fetch("http://localhost:8000/api/send/savedSkeleton", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({skeletonId : id})
  });
  const json = await response.json()
  console.log(json);
  if (!json.err){
    console.log("register Successfull")
  }
  else{
    console.log(json);
    alert("Invalid !!");
  }

  var detail = {
    "id" : json.Id,
    "name" : json.StrategyName,
    "desc" : json.Description,
    "instruments" : [],
    "InvestmentStrategySkeletonId": json.Id
}


var list = json.listInstrumentSkeleton;
var tempList = [];
console.log("llist = ");
console.log(list);
for(let i in list){
    var insTemp = {
        "segment" : list[i].segment,
        "side" : list[i].Side,
        "type" : list[i].Type,
        "id" : list[i].Id, 
    }
    tempList.push(insTemp);
    console.log(insTemp);
}
    console.log(tempList);
    detail.instruments = tempList;

    var arr = [];
    arr.push(detail);

      return arr;

 
}


module.exports = SavedSkeleton


  const makePlot =  async (strategy) =>{
      
    console.log(strategy)
    const response = await fetch("http://localhost:8000/api/MakePlot", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(strategy)
      });
      const json = await response.json()
      console.log(json);
      if (!json.err){
        console.log("register Successfull")
        return json;
      }
      else{
        console.log(json);
        alert("Invalid !!");
      }
    }

module.exports = makePlot

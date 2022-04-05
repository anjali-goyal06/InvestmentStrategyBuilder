import React, { useEffect, useState , Fragment } from 'react'
import '../styles/Home.css'
import { nanoid } from 'nanoid'
import exchangeData from "./exchange.json"
import tickerData from "./ticker.json"
import segmentData from "./segment.json"
import typeData from "./type.json"
import sideData from "./side.json"
import popularStrategiesName from "./popularStrategies"
import detailPopularStrategies from "./detailPopularStratergies"
import detailStrategiesSkeletonFunction from "./detailCustomStrategies.js"
import customStrategiesName from "./customStrategies"
import { ReadOnlyRow } from './ReadOnlyRow'
import makePlotFunction from './plots'
import { Plot } from './Plot'
import { EditableRow } from './EditableRow'
import Nav from './Nav'
import StockSelectedCard from './StockSelectedCard'

export const Home = () => {
   
    const [alertt,setAlert] = useState(false);
    const [alertContent,setAlertContent] = useState('');
    const [plotVisible,setPlotVisible] = useState(false); 
    const [_coords,setCoords] = useState({});
    const [isSkeletonSave , setIsSkeletonSave] = useState(false);
    const [isImplementationSave , setIsImplementationSave] = useState(true);
    const [selectedRadioBtn, setSelectedRadioBtn] = useState('popular');
    const [customStrategies,setcustomStrategies] = useState( [
        {
            "id" : "1",
            "name" : " "
        },
        {
            "id" : "2",
            "name" : "Blank"
        }
    ]);


    const [desc,setDesc] = useState({
        "Name" : "",
        "Description" : "",
        "StrategyName" : "",
        "DescriptionSkeleton" : ""
    })

    const [skeletonId , setSkeletonId] = useState(-1);
    const [popularStrategies,setpopularStrategies] = useState([
        {
            "id" : "0",
            "name" : " "
        },
        {
            "id" : "1",
            "name" : " "
        }
    ])
  
    const isRadioSelected = (value) => {
        return selectedRadioBtn === value;
    }
    var detailCustomStrategies;
    
    const addRow = () => {
        if(custom)   setCustom(false);
       

    }
    
    const handleRadioClick = async (event) => {
        setDetails([]);
        showTable(true);
        if(event.target.value=='popular'){
            setIsSkeletonSave(false)
        }
        setSelectedRadioBtn(event.target.value);
    }
    //const dataVal = {type:'',}
    useEffect(() => {

    }, [])

    const [details, setDetails] = useState([]);
    const [addDetails, setAddDetails] = useState({
        exchange: '',
        ticker: '',
        strategy: '',
        segment: '',
        expiry: '',
        side: '',
        quantity: '',
        strike: '',
        type: '',
        price : '',
        premium : ''
    });
    const [custom, setCustom] = useState(true);
    const [table, showTable] = useState(true);
    const [strikeAndType, setStrikeAndType] = useState(true);
    const [isPriceVisible,setPriceVisibility] = useState(false);
    const [nextButtonVisibility , setNextButtonVisibility] = useState(true);

    const handleDetailsStocks = (event) => {
        setDetails([]);
        showTable(true);
        let strategyID = document.querySelector('#strategy');
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addDetails };
        newFormData[fieldName] = fieldValue;

        setAddDetails(newFormData);
       
        if(!custom)  setCustom(true);
        
        console.log(addDetails)

    };

    const fetchStrategyName = async () => {
        console.log("fetch strategy name")

        var t = {
            "id" : "a",
            "name" : ""
        }

        if(selectedRadioBtn == 'popular' ){
            var temp = await popularStrategiesName();
            temp = [t , ... temp]
            setpopularStrategies(temp);
        }else{
            var temp = await customStrategiesName();
            var b = {
                "id" : "0",
                "name" : "Blank"
            }
            temp = [t , ... temp]
            temp.push(b);
            setcustomStrategies(temp);
        }

    }
    const handleDetailsStratergy = (event) => {

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
       
        showTable(true);
        setDetails([]);
        
        if(custom===false) setCustom(true)
        
        //fetch from database update dataVal {}

        event.preventDefault();
        const newFormData = { ...addDetails };
        newFormData[fieldName] = fieldValue;

        setAddDetails(newFormData);

    };
    const handleDetailsSegment = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addDetails };
        newFormData[fieldName] = fieldValue;

        setAddDetails(newFormData);
        if (fieldValue.toLowerCase() === 'option'){
            console.log("selected option")
            setStrikeAndType(false);
            setPriceVisibility(true);
        }
        else{
            setStrikeAndType(true);
            setPriceVisibility(false);
        }

    };

    const submit = (event) =>{
        event.preventDefault();
    }
   

    const changeButtonSubmit = (event) => {
        event.preventDefault();
        setNextButtonVisibility(true);
        setAlert(false)
        showTable(true);
        setCustom(true);
        setDetails([]);
    }

    const handleDetailsCustom = (event) => {
        event.preventDefault();
        let quantityID = document.querySelector('#quantity');
        if (quantityID.value > 9999999) quantityID.value = 9999999;

        let strikeID = document.querySelector('#strike');
        if (strikeID.value > 10000) strikeID.value = 10000;

        let priceID = document.querySelector('#price');
        if (priceID.value > 10000) priceID.value = 10000;

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addDetails };
        newFormData[fieldName] = fieldValue;

        setAddDetails(newFormData);

    };

 

    const fetchData = async (strategy, jsonFile) => {
        var detailJson;
        let pId = -1;
        let strategyID = document.querySelector('#' + strategy);
        for (let pS in jsonFile) {
            if (jsonFile[pS].name === strategyID.value) {
                pId = jsonFile[pS].id;
                break;
            }
        }

        setSkeletonId(pId);
        // console.log(pId);

        console.log(".......................");
        detailJson = await detailStrategiesSkeletonFunction(pId);
     //   console.log(detailJson);
        
        let tempObj;
        tempObj = { ...detailJson[0] }
       
        let exchangeVal = addDetails.exchange;
        let tickerVal = addDetails.ticker;
        let strategyVal = addDetails.strategy;
        let expiryVal = addDetails.expiry;

       

        let objCommon = {
            "exchange": exchangeVal,
            "ticker": tickerVal,
            "strategy": strategyVal,
            "expiry": expiryVal
        }
         let detailsArr = [];
        console.log("detailjson and tempObj");
        // console.log(detailJson);
         console.log(tempObj);
        // console.log(objCommon)

        let objDesc = desc;
        objDesc.StrategyName = tempObj.name;
        objDesc.DescriptionSkeleton = tempObj.desc;
        setDesc(objDesc);
        console.log(desc);

        console.log(tempObj.InvestmentStrategySkeletonId);
        console.log(tempObj.instruments)
        for (let i in tempObj.instruments) {
            console.log("krishna")
            let objMerge = { ...objCommon, ...tempObj.instruments[i] }
            detailsArr.push(objMerge);
        }
        setDetails(detailsArr);
        console.log(details)
    }
    const [editDetailId, setEditDetailId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        exchange: '',
        ticker: '',
        strategy: '',
        segment: '',
        expiry: '',
        side: '',
        quantity: '',
        strike: '',
        type: '',
        price : '',
        premium : '',
      });

      const handleClose = () =>{
          setModal(false);
      }
    const handleEditClick = (event, detail) => {
        event.preventDefault();
        setEditDetailId(detail.id);
        console.log(detail.id);
    
        const formValues = {
            exchange: detail.exchange,
            ticker: detail.ticker,
            strategy: detail.strategy,
            segment: detail.segment,
            expiry: detail.expiry,
            side: detail.side,
            quantity: detail.quantity,
            strike: detail.strike,
            type: detail.type,
            price : detail.price,
            premium : detail.premium
        };
    
        setEditFormData(formValues);
      };

      const handleCancelClick = () => {
        setEditDetailId(null);
      };

      const handleDeleteClick = (editDetailId) => {
        const newDetails = [...details];
    
        const index = details.findIndex((detail) => detail.id === editDetailId);
    
        newDetails.splice(index, 1);
    
        setDetails(newDetails);
      };

      const handleEditFormChange = (event) => {
        console.log('handleEditformchange')
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };

      const handleEditFormSubmit = (event) => {
          console.log('handleEditform')
        event.preventDefault();
    
        const editedDetails = {
            exchange: editFormData.exchange,
            ticker: editFormData.ticker,
            id: editDetailId,
            strategy: editFormData.strategy,
            segment: editFormData.segment,
            expiry: editFormData.expiry,
            side: editFormData.side,
            quantity: editFormData.quantity,
            strike: editFormData.strike,
            type: editFormData.type,
            price : editFormData.price,
            premium : editFormData.premium
        };
    
        const newDetails = [...details];
    
        const index = details.findIndex((detail) => detail.id === editDetailId);
    
        newDetails[index] = editedDetails;
    
        setDetails(newDetails);
        setEditDetailId(null);
      };
    
   
    const handleDetailsAdd = (event) => {
        event.preventDefault();
        console.log("next button pressed")
        console.log(addDetails.strategy);
        setNextButtonVisibility(false);
        console.log(addDetails.strategy)
        if(addDetails.strategy === 'Blank'){
            setCustom(false);
            return
        }
       
        
        console.log("adddd");
        
        showTable(false);
        const table = document.querySelector('.dtable');
        table.style.display = 'block';
        if (selectedRadioBtn === 'popular') {
            console.log("22.......................");
            
            fetchData("strategy", popularStrategies);
        }
        else if (selectedRadioBtn === 'custom' && addDetails.strategy !== 'Blank') {
            fetchData("strategy", customStrategies);
        }
       
    }

    const addInstrument = (event) =>{
        event.preventDefault();
        setIsSkeletonSave(true);
        setAlert(false);
        setIsImplementationSave(true)
        setCustom(true);
        if(table)  showTable(false);
        console.log(addDetails)
        

        console.log("111.......................");

        const newDetail = {
            id: nanoid(),
            exchange: addDetails.exchange,
            ticker: addDetails.ticker,
            strategy: addDetails.strategy,
            segment:  addDetails.segment,
            expiry: addDetails.expiry,
            side: addDetails.side,
            quantity : addDetails.quantity,
            strike: addDetails.segment === 'Option' ? addDetails.strike : '_',
            type: addDetails.segment === 'Option' ? addDetails.type : '_',
            price : addDetails.segment === 'Option' ? '_' : addDetails.price,
            premium : addDetails.segment === 'Option' ? addDetails.premium : '_'
        };
        console.log(newDetail);
        const newDetails = [...details, newDetail];
        setDetails(newDetails);
    }

    const sendDataToBackend =  async (strategy,flag) =>{
    console.log(strategy)
    
    var url = "";
    if(flag){
        url = "http://localhost:8000/api/save/SaveStrategy";
    }else{
        url = "http://localhost:8000/api/save/SaveStrategySkeleton"
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(strategy)
      });
      console.log(response)
      const json = await response.json()
      console.log(json);
      if (!json.err){
        
        if(flag){
            setIsImplementationSave(false)
        }
        console.log("register Successfull")
        setAlert(true);
        console.log(alertt)
        setAlertContent('Your Data is saved successfully');
        setIsSkeletonSave(false);

        if(isImplementationSave) setIsImplementationSave(false)
        return json;
      }
      else{
        console.log(json);
        alert("Invalid !!");
      }
    }
  
    const changeFormatToSend = (objDesc) =>{
        let instruments = [];
        for (let i in details) {
            let instObj = {
                "SkeletonId" : details[i].id,
                "segment": details[i].segment,
                "Side": details[i].side,
                "Quantity": details[i].quantity,
                "StrikePrice": details[i].strike,
                "Type": details[i].type,
                "Price" : details[i].price,
                "Premium" : details[i].premium
            }
            instruments.push(instObj);
        }
        let newCustomStrategy = {
            "Name": (objDesc) ? objDesc.Name : '',
            "StrategyName" :(objDesc) ? objDesc.StrategyName : '',
            "Description" :(objDesc) ? objDesc.Description : '' ,
            "DescriptionSkeleton": (objDesc) ? objDesc.DescriptionSkeleton : '',
            "ExpiryDate": details[0].expiry,
            "StockName": details[0].exchange,
            "Ticker": details[0].ticker,
            "listInstruments": instruments,
            "InvestmentStrategySkeletonId" : skeletonId,
            "isSkeletonSaved" : !isSkeletonSave,
        }
        return newCustomStrategy;
    }
    const save = async () => {
       
       
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    // const [nameDesc, setNameDesc]=useState({});
  

    const makeplot = async () => {
       
        var newCustomStrategy = changeFormatToSend();
        console.log(newCustomStrategy);
        var coordinates = await makePlotFunction(newCustomStrategy);
        setCoords(coordinates);
        setPlotVisible(true);
    }

    const saveModalSkeleton = () => {
        setIsImplementationSave(false);
    }

    const saveModal = ()=>{
        setIsImplementationSave(true);
    }

    const saveModalData = async () =>{

        let stName =(document.querySelector('#StrategyName')) ? document.querySelector('#StrategyName').value : "";
        let stDesc = (document.querySelector('#DescriptionSkeleton')) ? document.querySelector('#DescriptionSkeleton').value : "";

        let Name =(document.querySelector('#Name')) ? document.querySelector('#Name').value : "";
        let Desc = (document.querySelector('#Description')) ? document.querySelector('#Description').value : "";
        
        var obj = {
            "Name" : (Name!=="") ? Name : desc.Name,
            "Description" : (Desc!=="") ? Desc : desc.Description,
            "StrategyName": (stName!=="") ? stName : desc.StrategyName,
            "DescriptionSkeleton" : (stDesc!=="") ? stDesc : desc.DescriptionSkeleton
        }

        setDesc(obj);

        var newCustomStrategy = changeFormatToSend(obj);
        var response = await sendDataToBackend(newCustomStrategy,isImplementationSave);

        if(isImplementationSave) setIsImplementationSave(false);
        if(isSkeletonSave) setIsSkeletonSave(false);
    }

   

    

    return (
        <>
           
           {
               alertt && 
               <div class="alert alert-primary" role="alert">
                  {alertContent}
               </div>
           }

            <Nav/>

            <div className='home'>
                <div className='main'>
                    
                    <form action="#" onSubmit={submit}>
                      {nextButtonVisibility &&
                        
                        <div> 
                            <p className='heading'>Select Products</p>
                        <div className="main-select-products">
                            <div className='select-products'>
                                <p className='sub-heading-1st'>Exchange</p>
                                <select
                                    name="exchange"
                                    id="exchange"
                                    className='products'
                                    onChange={handleDetailsStocks} 
                                >
                                    {
                                        exchangeData.map((data) => {
                                            return <option value={data.name}>{data.name}</option>
                                        })
                                    }</select>
                            </div>
                            <div className='select-products'>
                                <p className='sub-heading-1st'>Ticker</p>

                                <select
                                    name="ticker"
                                    id="ticker"
                                    className='products'
                                    onChange={handleDetailsStocks}
                                >

                                    {
                                        tickerData.map((data) => {
                                            return <option value={data.name}>{data.name}</option>
                                        })
                                    }</select>
                            </div>
                            <div className='select-products'>
                                <p className='sub-heading-1st'>Expiry Date</p>
                                <input
                                    type="date"
                                    min={disablePastDate()}
                                    required
                                    name="expiry"
                                    className='products'
                                    onChange={handleDetailsStocks}
                                />
                            </div>
                            <div className='select-products'>
                                <p className='sub-heading-1st'>Type of Strategy</p>
                                <div className='radio-btn'>
                                    <div>

                                        <input type="radio" id="popular-radio"
                                            className='option-strategy'
                                            name="select-stratergy"
                                            value="popular"
                                            checked={isRadioSelected('popular')}
                                            onChange={handleRadioClick} />
                                        <label for="popular-radio" selected>Popular</label>
                                    </div>
                                    <div>

                                        <input type="radio" id="custom-radio"
                                            className='option-strategy'
                                            name="select-stratergy"
                                            value="custom"
                                            checked={isRadioSelected('custom')}
                                            onChange={handleRadioClick} />
                                        <label for="custom-radio">Custom</label>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='main-select-products'>
                            <div className='select-products'>
                                <p className='sub-heading-1st'>Strategy</p>

                                <select
                                    name="strategy"
                                    id="strategy"
                                    className='products'
                                    onClick={fetchStrategyName}
                                    onChange={handleDetailsStratergy}
                                >
                                    {selectedRadioBtn == 'popular' ?
                                        popularStrategies.map((data) => {
                                            return <option value={data.name}>{data.name}</option>
                                        }) :
                                        customStrategies.map((data) => {
                                            return <option value={data.name}>{data.name}</option>
                                        })

                                    }</select>
                            </div>
                            <div className='select-products'></div>
                            <div className='select-products'></div>
                            <div className='select-products'></div>                
                        </div>
                      </div>
                    }

                    {
                        (!nextButtonVisibility) && <StockSelectedCard Data={addDetails} nextOnClick={changeButtonSubmit} Desc={desc}/>
                    }
                        {
                            (nextButtonVisibility) && <button type="button" onClick={handleDetailsAdd} className='next-button'>Next</button>
                        }
                        {/* { 
                            (!nextButtonVisibility) && <button type="button" onClick={changeButtonSubmit} className='next-button'>Change</button>
                        } */}

                    { (!custom) && <div>
                        <div className={`main-select-products ${custom === true ? 'customDiv' : ''}`} >
                            <div className='select-products'>
                                <p className='sub-heading-1st' >Segment</p>

                                <select
                                    name="segment"
                                    id="segment"
                                    className='products'
                                    onChange={handleDetailsSegment}>
                                    {
                                        segmentData.map((data) => {
                                            return <option value={data.name}>{data.name}</option>
                                        })
                                    }
                                </select>

                            </div>
                            <div className='select-products'>
                                <p className='sub-heading-1st' >Side</p>

                                <select
                                    name="side"
                                    id="side"
                                    className='products'
                                    onChange={handleDetailsCustom}>
                                    {
                                        sideData.map((data) => {
                                            return <option value={data.name}>{data.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='select-products'>
                                <p className='sub-heading-1st' >Quantity</p>
                                
                                <input
                                    name="quantity"
                                    id="quantity"
                                    className='products'
                                    type="number"
                                    min={0}
                                    max={9999999}
                                    value={addDetails.quantity}
                                    onChange={handleDetailsCustom}
                                >
                                </input>
                                
                            </div>

                            <div className={`select-products ${ (!strikeAndType) ? 'customDiv' : ''}`}>
                                    {/* <div className='select-products customDiv'> */}
                                    <p className='sub-heading-1st' >Price</p>

                                    <input
                                        name="price"
                                        id="price"
                                        className='products'
                                        type="number"
                                        min={0}
                                        max={10000}
                                        value={addDetails.price}
                                        onChange={handleDetailsCustom}
                                    >
                                    </input>
                            </div>

                          
                        </div>

                      

                        <div className={`main-select-products ${custom === true ? 'customDiv' : ''} `}>
                            
                           

                            <div className={`select-products ${strikeAndType === true ? 'customDiv' : ''}`}>
                                {/* <div className='select-products customDiv'> */}
                                <p className='sub-heading-1st' >Strike Price</p>

                                <input
                                    name="strike"
                                    id="strike"
                                    className='products'
                                    type="number"
                                    min={0}
                                    max={10000}
                                    value={addDetails.strike}
                                    onChange={handleDetailsCustom}
                                >
                                </input>
                            </div>

                            <div className={`select-products ${strikeAndType === true ? 'customDiv' : ''}`}>
                                {/* <div className='select-products customDiv'> */}
                                <p className='sub-heading-1st' >Premium</p>

                                <input
                                    name="premium"
                                    id="premium"
                                    className='products'
                                    type="number"
                                    min={0}
                                    max={10000}
                                    value={addDetails.premium}
                                    onChange={handleDetailsCustom}
                                >
                                </input>
                            </div>
                        
                            <div className={`select-products ${strikeAndType === true ? 'customDiv' : ''}`}>
                                    <p className='sub-heading-1st' >Type</p>
                                    <select
                                        name="type"
                                        id="type"
                                        className='products'
                                        onChange={handleDetailsCustom}>
                                        {
                                            typeData.map((data) => {
                                                return <option value={data.name}>{data.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                           
                        </div>
                         <button type="button" onClick={addInstrument} className='next-button'>Add</button>
                      
                      </div> 
                    }
                    </form>

                    <div className='dtable' >
                    <form onSubmit={handleEditFormSubmit}>
                        <table className={`strategy-table ${table == true ? 'customDiv' : ""}`}>
                            <thead>
                                <tr>
                                    <th>Exchange</th>
                                    <th>Ticker</th>
                                    <th>Strategy</th>
                                    <th>Segment</th>
                                    <th>Expiry</th>
                                    <th>Side</th>
                                    <th>Quantity</th>
                                    <th> Price </th>
                                    <th>Strike Price</th>
                                    <th>Premium</th>
                                    <th>Type </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {details.map((detail) => (
                                    <Fragment>
                                        {editDetailId === detail.id ?
                                (<EditableRow 
                                    editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}
                                />)
                                    : (
                                        <ReadOnlyRow detail={detail}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}/>
                                    )
                                        }
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                        </form>

                       {
                           (addDetails) && (addDetails.strategy==='Blank' || selectedRadioBtn=='custom' ) && (!table) &&
                           <button type="button" className='next-button' onClick={addRow}>Add Row</button>
                       }

                        {
                            (!table) &&  
                            <>

                                <button type='submit' className='next-button' onClick={makeplot}>Make Plot</button>

                                { 
                                    (isSkeletonSave) && <button type='submit'  className='next-button' data-toggle="modal" data-target="#exampleModalCenter" onClick={saveModalSkeleton}>Save Strategy</button>
                                }

                                {
                                    <button type='submit'  className='next-button' data-toggle="modal" data-target="#exampleModalCenter" onClick={saveModal}>Save Implementation</button>
                                }   

                            </>
                        }

                    </div>    
                        {plotVisible  && <Plot coordinates= {_coords} vv="aaa"/> }
                     
                         
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add Description</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                
                            <h4>Enter Details</h4>
                            {
                                (console.log("model opne"))
                            }
                            { isSkeletonSave  &&
                            <>
                            <p><input type='text' id="StrategyName" placeholder='Enter Strategy Name' required class="form-control"/></p>
                            <p><textarea class="form-control" rows="3" id="DescriptionSkeleton"  placeholder='Enter Strategy Description' required  cols="50"></textarea></p>
                            </>
                            }

                            { isImplementationSave &&
                            <>
                            <p><input type='text' id="Name" placeholder='Enter Strategy Implementation Name' required class="form-control"/></p>
                            <p><textarea class="form-control" rows="3" id="Description" placeholder='Enter Implememtation Description' required cols="50"></textarea></p>
                            </>
                            }

                            </div>
                        <div class="modal-footer">
                            
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={saveModalData} data-dismiss="modal" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>

        </>
    )
}



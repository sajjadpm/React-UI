import React, { useState } from "react"
import XMLParser from 'react-xml-parser';
//import {parseString} from 'xml2js' 

function Challenge2(){

    const [tempValue,setTempValue] = useState();
    const [unitSelection,setUnitSelection] = useState();
    const [convertedTemp, setConvertedTemp] = useState();

    function handleTextChange(event){

        setTempValue(event.target.value);

    }
    function handleSelectionChange(event){

        setUnitSelection(event.target.value)
    }

    function handleClick(event){
        
        fetch("https://cors-anywhere.herokuapp.com/https://www.q88.com/WS/Q88WSInternal.asmx/ConvertTemperature?property="+unitSelection+"&val="+ tempValue,
            {method : "GET"})
         .then(response => response.text())
         .then(responseText => {
              var jsonResponse = new XMLParser().parseFromString(responseText);
              console.log(jsonResponse)
              if (unitSelection === 'Celsius'){
                  var temp = jsonResponse.children[1].value;
                setConvertedTemp(Math.round(temp)+" Fahrenheit")
              }
              else{
                  var temp =jsonResponse.children[0].value;
                setConvertedTemp(Math.round(temp) +" Celsius") 
              }
          })
         .catch(error=>{
             console.log(error);
         })
    }

    return (
        <div>
            <br/>
            <br/>
        <div className="container">
            <h3>Challenge 2</h3>
            <div>
            <input type ="text" onChange={handleTextChange} placeholder="Enter Temperature"/>
            <select name="temperature" id="temperature1" onChange={handleSelectionChange}>
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
            </select>
            <input type ="button" className="button-7" onClick={handleClick} value ="Submit"/>
            <br/>
            <p>{convertedTemp}</p>
        </div>
        </div>
        </div>
        );

}

export default Challenge2;
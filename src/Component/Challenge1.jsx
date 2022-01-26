import React, { useState } from "react"

function Challenge1(){

    const [selectedFile,setSelectedFile] = useState();
    const [isFilePicked,setIsFilePicked] = useState(false);
    const [fileUploadError,setFileUploadError] = useState();
    const [isError,setError] = useState(false);
    
    function buttonClick(event){

       let formData = new FormData();
       formData.append('File',selectedFile);
       setError(false);
       fetch(
           'http://localhost:8080/users/fileUpload',
           {method : 'POST',
            body : formData
           }
       ).then(response => response.json())
        .then(result => {
            console.log("Success : ",result);
            if (result.message != "Success"){
                setError(true);
            }
            setFileUploadError(result.message)
        })
        .catch((error)=>{
            console.log("Error : ",error);
        })
    
    }
    function fileChangeHandler(event){
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);

    }

    return(
        <div className="container">
            <h3>Challenge1</h3>
            <div>
              <input type="file" onChange={fileChangeHandler}/>
              <input type="button" className="button-7" value ="upload" onClick={buttonClick}/>
              <p style={isError === false?{ color:'green'} : {color:'red'}}>{fileUploadError}</p>
            </div> 
        </div>
    
    );


}

export default Challenge1;
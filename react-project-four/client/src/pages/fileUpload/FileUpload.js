import React, {useState} from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState();
    const handleFile = (e) =>{
        setFile(e.target.files[0])
    }
    const handleUpload = () => {
        const formdata = new FormData();
        formdata.append("image", file);
        axios.post("http://localhost:3002/upload", formdata)
        .then(res => {
            if(res.data.Status === "Success"){
                console.log("Success")
            } else {
                console.log("Failed")
            }
        }
        )
        .catch(err => console.log(err));
    }
  return (
    <div className="container">
        <input type='file' onChange={handleFile}/>
        <button onClick={handleUpload}>Upload</button>
      
    </div>
  )
}

export default FileUpload

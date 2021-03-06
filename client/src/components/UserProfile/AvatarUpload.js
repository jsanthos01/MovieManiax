import React, {useState} from 'react'

function AvatarUpload(props) {
    const userid = localStorage.id;
    const [ myPic, setMyPic] = useState ( '' )

    function handleChange(e){
        const file = e.target.files[0];
        setMyPic(file)
    }

    
    async function handleUpload(e){
        e.preventDefault();
        props.uploadPic(e);
        
        if(myPic){
            let myForm = document.getElementById('myForm');
            let formData = new FormData(myForm);
            const uploadPic = await fetch(`/api/upload/${userid}`, 
                {
                    method: 'PUT',
                    body: formData
                }
            ).then( result=>result.json())
        }
        
    }
    return (
        <div>            
            <form id='myForm' role="form" encType="multipart/form-data"> 
               <input type="file" name="myFile" onChange={handleChange} />
               <button onClick={handleUpload}>Upload</button> 
            </form>
        </div>
    )
}

export default AvatarUpload
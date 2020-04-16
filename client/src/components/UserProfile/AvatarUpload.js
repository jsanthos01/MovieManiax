import React from 'react'

function AvatarUpload(props) {
    

    function handleUpload(){

    }
    return (
        <div>
            <form> 
                <input type="file" name="myFile" />
               <button onClick={props.UploadPic}>Upload </button> 
                {/* <button class='btn btn-lg btn-primary' onClick={props.saveForm}>Save Review</button> */}
            </form>
        </div>
    )
}

export default AvatarUpload

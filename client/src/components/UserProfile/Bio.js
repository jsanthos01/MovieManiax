import React, {useState} from 'react'

function Bio(props) {
    const bioId = localStorage.id;
    const[ myBio, setMyBio] = useState( {bio: ''} )

    function updateBio(e){
        e.preventDefault();
        let newBio = e.target.value;
        // console.log(newBio);
        const key = 'bio'
        setMyBio( { ...myBio, [key]: newBio } );
    }
    // console.log(myBio)
    async function handleSubmit(e){
        e.preventDefault();       
        const apiBio = await fetch(`/api/user/${bioId}`, 
            {   method: 'put',
                headers:{
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(myBio)
          }).then( result=>result.json())
        props.handleBioSubmit(e);    
    };

    return (
        <div>
            <form>
                <textarea rows="10" name="myBio" value={myBio.bio} cols="60" onChange={updateBio}></textarea>
                <br/><br/>
                <input onClick={handleSubmit} class="btnStyle" type="submit"></input>
            </form>
        </div>
    )
}

export default Bio
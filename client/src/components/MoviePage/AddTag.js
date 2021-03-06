import React, {useState} from 'react'


function TagForm(props) {
    const[ myTag, setMyTag ] = useState([] );
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    let tagData = {};

    function updateTag(e){
        e.preventDefault();     
        let tagString = e.target.value;
        let newtagString = tagString.toLowerCase().split(','); 
        setMyTag(newtagString)
    } 

    async function handleSubmit(e){
        e.preventDefault();   
        props.submitTag(e);
        let noSpaceTag = myTag.map(name => name.trim());
    
        tagData = {
            id: props.userId,
            movieId: props.movieId,
            title: props.title,
            image:props.image,
            tags:  noSpaceTag 
        }

        const postTagData = await fetch('/api/tag',{  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tagData)
        }).then( result=>result.json());

    }
    return (
        <div>
            <form>
                <input type="text" name="" id="tags" value={myTag} onChange={updateTag} placeholder="seperate tags by comma" size="40"></input><br/>
                
                <button class="btn myBtnPink" type="submit" onClick={handleSubmit}>Add</button>  
            </form>
            
        </div>
    )
}

export default TagForm

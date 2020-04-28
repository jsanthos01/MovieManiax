import React, {useState} from 'react'

function EditTag(props) {
    const[ editTags, setEditTags] = useState( props.movieTags )
    // console.log(props)

    function handleChange(e){
        e.preventDefault();
        let tagString = e.target.value;
        let newtagString = tagString.toLowerCase().split(',');

        let noSpaceTag = [];
        for ( var i = 0; i < newtagString.length; i++){
            noSpaceTag.push(newtagString[i].replace(/ /g, ''))
        }
        setEditTags(noSpaceTag);  
    }
    
    async function handleSubmit(e){
        e.preventDefault();   
        props.submitTag(e, props.movieId); 
        
        let tagData ={ 
            movieId: props.movieId,
            userId: props.userId,
            tags: editTags
        }

        const postEditTags = await fetch('/api/edittag',
        {  
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
                <input type="text" name="" id="tags"  value={editTags} onChange={handleChange} placeholder="seperate tags by comma" size="40"></input><br/>
                
                <button type="submit" onClick={handleSubmit}>Add</button>  
            </form>
            
        </div>
    )
}

export default EditTag

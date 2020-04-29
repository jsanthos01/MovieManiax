import React, {useState} from 'react'

function EditTag(props) {
    const[ editTags, setEditTags] = useState( props.movieTags )

    function handleChange(e){
        e.preventDefault();
        let tagString = e.target.value;
        let newtagString = tagString.toLowerCase().split(',');
        setEditTags(newtagString);  
    }
    
    async function handleSubmit(e){
        e.preventDefault();   
        props.submitTag(e, props.movieId); 
        let noSpaceTag = editTags.map(name => name.trim());
        
        let tagData ={ 
            movieId: props.movieId,
            userId: props.userId,
            tags: noSpaceTag
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
                
                <button type="submit" class="btn btnStyle" onClick={handleSubmit}>Add</button>  
            </form>
            
        </div>
    )
}

export default EditTag

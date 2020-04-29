import React, {useState, useEffect} from 'react'
// import './GroupChat.css'

function GroupChat() {
    const id = localStorage.id;
    const name = localStorage.name
    const [chatFormOpen, setChatFormOpen] = useState(false);
    const [groupData, setGroupData] = useState({id: id, name: name, groupName: '', groupImage:''})
    const [myGroups, setMyGroups] = useState([])
 
    
    const style ={
        height: "50vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundImage:  "linear-gradient(to right, rgba(3.14%, 14.51%, 40.39%, 0.5) 150px, rgba(7.06%, 20.39%, 50.59%, 0.4) 100%), url(https://ak8.picdn.net/shutterstock/videos/1039461818/thumb/12.jpg)",
        textAlign: "center"
    }

    function handleInputChange( e ){
        const { id, value } = e.target; 
        setGroupData( { ...groupData, [id]: value } );
    }

    async function postGroup(){
        const postGroupData = await fetch('/api/groupData',
        {  
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groupData)
        }).then( result=>result.json());
        getGroups();
    }

    async function getGroups(){
        const getUsersGroups = await fetch(`/api/groupData/${id}`).then(res => res.json());
        setMyGroups(getUsersGroups);
    }

    useEffect(function(){
        getGroups();
    }, [])

   
    return (
        <div>
            <div class="jumbotron" style={style}>
                <h1 class="display-4" style={{fontWeight: "900"}}>My Movie GroupChats</h1>
                <div>
                    <i class="fas fa-5x fa-users" onClick={() => setChatFormOpen(true)}></i>
                </div>
            </div>
            {chatFormOpen ? 
                <div id="addGroupWin" class="window container-fluid hide card-body">
                    <div class="d-flex justify-content-end">
                        <i class="fa fa-times"  onClick={() => setChatFormOpen(false)} aria-hidden="true"></i>
                    </div>
                    <div class="d-flex justify-content-center" style={{color: "black"}}>
                        <div class="card mt-4 col-8">
                            <form class="card-body">
                                <h3>Add your Group</h3>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="groupName">Group Name</label>
                                        <input 
                                            type="text"
                                            value={groupData.groupName} 
                                            class="form-control" 
                                            id="groupName" 
                                            onChange={handleInputChange} 
                                            placeholder="Insert Group Name" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="groupImgUrl">Group Image</label>
                                    <input 
                                        type="text" 
                                        value={groupData.groupImage} 
                                        class="form-control" 
                                        id="groupImage"
                                        onChange={handleInputChange}  
                                        placeholder="Enter url for the image" />
                                </div>
                                <div class="form-group disabled">
                                    <label for="inputGroupImg">Upload Group Image Disable for now</label>
                                    <div class="input-group mb-3" id="inputGroupImg">
                                        <div class="custom-file">
                                            <input type="text" class="custom-file-input" id="inputGroupFile02" />
                                            <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="">Upload</span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={postGroup}>Create Group</button>
                            </form>
                        </div>
                    </div>
                </div> : ''
            }
           
            <div class="chatDashboardContainer" style={{textAlign: "center"}} >
                <div class="row">
                    {myGroups.map(group => 
                        <div class="col-lg-4">
                            <img class="rounded-circle" src={group.groupImage} alt="Generic placeholder image" width="140" height="140" />
                            <h2>{group.groupName}</h2>
                            <p><a class="btn btn-primary" href="/join" role="button">Chat Now!</a></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GroupChat

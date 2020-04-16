import React,{useState , useEffect} from 'react'

function Friend() {
    const [ searchInput, setSearchInput ] = useState("");
    const [ userList, setUserList] = useState([]);
    const [ showList, setShowList ] = useState([]);
    const [ userProfile, setUserProfile ] = useState([]);
    const [ myFriendList, setMyFriendList ] = useState([]);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );

    const messageStyle = {
        position: 'sticky',
        top: '0',
        left: '0'
    }

    function handleInputChange( e ){
        const newInput = e.target.value;
        const res = newInput.toLowerCase();
        
        setSearchInput( res );

        // adjusting our user list on screen
        if( newInput.length>0 ){
            const newList = userList.filter( user=>user.name.toLowerCase().indexOf(newInput) == 0 )
            setShowList( newList );
        } else {
            setShowList( [] );
        }
    }
    function showUserProfile( newInput ){
        // setSearchInput( newInput.user.name.first );
        // clear the list
        setUserProfile( newInput );
        setShowList( [] );
        // console.log('userProfile',userProfile)
    }
    async function addToFriendList( user ){
        console.log('addfrend btn clicked. userId: ', user);
        const friendInfo = {
            userId: localStorage.id,
            friendId: user._id,
            friendName: user.name,
            // friendImg: user.img
        }
        console.log('posting friendInfo: ', friendInfo);
        const addedFriend= await fetch('/api/saveFriend',
                {  
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(friendInfo)
                }).then( result=>result.json());

                if( addedFriend.message ){
                    setAlertMessage( { type: 'success', message: addedFriend.message } );
                    setTimeout( function(){ setAlertMessage( {} ); }, 3000 );
                } else {
                    setAlertMessage( { type: 'danger', message: addedFriend.message } );
                    setTimeout( function(){ setAlertMessage( {} ); }, 2500 );
                }
                // setShowList('');
                setUserProfile([])

                loadFriend()  
        
    }
    async function deleteFromFriendList( frndId ){
        console.log('delete btn clicked. userId: ', frndId);
        // const friendInfo = {
        //     userId: localStorage.id,
        //     friendId: user._id,
        //     friendName: user.name,
        //     // friendImg: user.img
        // }
        const userId = localStorage.id;

        console.log(`***loading userList `);
        // const userListResult = await fetch('https://randomuser.me/api/0.8/?results=45').then(result=>result.json());  
        const friendListResult = await fetch(`/api/deleteFriend/${userId}/${frndId}`).then(result=>result.json());  

        // setMyFriendList( friendListResult[0].friendList );
        // console.log( 'friendListResult: ', friendListResult[0].friendList );
        loadFriend()  
    }

    async function loadPeople(){

        console.log(`***loading userList `);
        // const userListResult = await fetch('https://randomuser.me/api/0.8/?results=45').then(result=>result.json());  
        const userListResult = await fetch('/api/UsersList').then(result=>result.json());  

        setUserList( userListResult );
        console.log( 'userListResult: ',userListResult )

    }
    async function loadFriend(){
        const userId = localStorage.id;

        console.log(`***loading userList `);
        // const userListResult = await fetch('https://randomuser.me/api/0.8/?results=45').then(result=>result.json());  
        const friendListResult = await fetch(`/api/friendList/${userId}`).then(result=>result.json());  
        setMyFriendList( friendListResult[0].friendList );
        console.log( 'friendListResult: ', friendListResult[0].friendList )
    }
    async function viewProfile(user){
        console.log('to check if view btn works: ', user)
    }
    useEffect( function(){
        loadPeople()  
        loadFriend()  
    }, []);
    return (
        <div class="container" style={{color : 'black'}}>
            <div style={messageStyle} className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            <form >
                <h4 style={{color: "white"}}>Find People</h4>
                <div class="input-group">
                    <input onChange={handleInputChange} value={searchInput} type="text" class="form-control" placeholder="Search your user"/>
                </div>
                <div class="mb-3">
                    <ul class="col-6 list-group">
                        { showList.map( user =><li class="list-group-item" onClick={()=>showUserProfile(user)}>{user.name}</li> )}
                    </ul>
                </div>
            </form>
            <div class="container"> 
                { userProfile.name  ? 
                <div>
                    <div class="row card-body"> 
                        <div class="col-md card" style={{border: '1px dashed red'}}>
                            <h3>{ userProfile.name} </h3>
                            <ul class="col list-group mb-3">
                                <li class="list-group-item">  
                                    { userProfile.email}
                                </li>
                            </ul>
                        </div>
                        <div class="btn btn-success" onClick={()=>addToFriendList(userProfile)}> Add as Friend </div>
                    </div> 
                </div>: '' }
            </div>
            {/* friendList._id */}
            <div class="container">
                
                <div class="mb-3">
                    <h4 style={{color: "white"}}>Your Following List</h4>
                    <ul class="col-lg list-group ">
                        { myFriendList.length>0 ? myFriendList.map( user =>
                        <li class="list-group-item d-flex justify-content-between" >{user.name}
                        <div class="d-flex justify-content-between">
                            <div class="btn btn-success mr-2" onClick={()=>viewProfile(user)}>View Profile</div>
                            <div class="btn btn-success" onClick={()=>deleteFromFriendList(user._id)}> <i class="fas fa-user-times"></i></div>
                        </div>
                        </li> ) : <h4 style={{color: "white"}}>Add people you would like to follow</h4>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Friend

import React,{useState , useEffect} from 'react'
import { Link } from "react-router-dom";
import './Friends.css'

function Friend() {
    const [ searchInput, setSearchInput ] = useState("");
    const [ userList, setUserList] = useState([]);
    const [ showList, setShowList ] = useState([]);
    const [ userProfile, setUserProfile ] = useState([]);
    const [ myFriendList, setMyFriendList ] = useState([]);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const [ profileImg, setProfileImg] = useState( [] )

    const messageStyle = {
        width: '80%',
        border: 'none',
        background: '#26b3b8',
        color: 'white',
        position: 'sticky',
        top: '0',
        left: '0',
        zIndex: '10',
        margin: '0 auto'
    }
    const style = {
        myForm: {
            width: "70%",
            margin: "50px"
        }, 
        myInput: {
            borderTopLeftRadius: '20px',
            borderRadius: '20px',
            borderBottomLeftRadius: '20px'
        },
        myBtnRgt: {
            width: '150px',
            padding: '10px',
            backgroundColor: '#ed145b',
            borderRadius: '20px',
            marginLeft: '20px',
            cursor: 'pointer',
            border: 'none'
        }

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
        setUserProfile( newInput );
        setShowList( [] );
    }
    async function addToFriendList( user ){
        console.log('addfrend btn clicked. userId: ', user);

        console.log('checking if exist: ', myFriendList.findIndex(friend=> friend.friendId === user._id));
        
        if ( myFriendList.findIndex(friend=> friend.friendId === user._id) > -1 ){
            console.log('friend already exist in your list!')
            setAlertMessage( { type: 'success', message: 'friend already exist in your list!' } )
            return;
        }

        const friendInfo = {
            userId: localStorage.id,
            userName: localStorage.name,
            friendId: user._id,
            friendName: user.name,
            friendImg: user.profileImg
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

            setUserProfile([])
            loadFriend()  
        
    }
    async function deleteFromFriendList( frndId ){
        // console.log('delete btn clicked. userId: ', frndId);
        const userId = localStorage.id;

        // console.log(`***loading userList `);
        const friendListResult = await fetch(`/api/deleteFriend/${userId}/${frndId}`).then(result=>result.json());  

        loadFriend()  
    }

    async function loadPeople(){

        console.log(`***loading userList `);
        const userListResult = await fetch('/api/UsersList').then(result=>result.json());  

        setUserList( userListResult );
        console.log( 'userListResult: ',userListResult )

    }
    async function loadFriend(){
        const userId = localStorage.id;

        console.log(`***loading userList `);
        const friendListResult = await fetch(`/api/friendList/${userId}`).then(result=>result.json());  
        setMyFriendList( friendListResult[0].friendList );
        console.log( '104 friendListResult: ', friendListResult[0].friendList );
        const getUserInfo = await fetch(`/api/UsersList`).then(res => res.json());
        setProfileImg(getUserInfo); 
    }
    
    useEffect( function(){
        loadPeople()  
        loadFriend()  
    }, []);
    return (
        <div class="container" style={{color : 'black', marginTop: "30px"}}>
            <div style={messageStyle} className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            <form >
                <h4  class="findPeople" style={{color: "white"}}>Find People</h4>
                <div class="input-group">
                    <input onChange={handleInputChange} value={searchInput} type="text" class="form-control" style={style.myInput} placeholder="Search your user"/>
                </div>
                <div class="mb-3">
                    <ul class="col-6 list-group">
                        { showList.map( user =><li class="list-group-item" onClick={()=>showUserProfile(user)}>{user.name}</li> )}
                    </ul>
                </div>
            </form>
            <div class="container"> 
                { userProfile.name  ? 
                    <div class="card"> 
                        <div class="row card-body" >
                            <div  class="col-md-10">
                                <h3>{ userProfile.name} </h3>
                                <ul class="col list-group mb-3">
                                    <li class="list-group-item">  
                                        { userProfile.email}
                                    </li>
                                </ul>
                            </div>
                            <div  class="col-md-2">
                                <div class="btn btn-success" onClick={()=>addToFriendList(userProfile)}> Follow </div>
                            </div>
                        </div>
                    </div> 
                : '' }
            </div>
            {/* friendList._id */}
            <div class="container">
                <div class="mb-3">
                    <h4 class="findPeople" style={{color: "white"}}>Your Following List</h4>
                        { myFriendList.length>0 ? myFriendList.map( user =>
                        <div class="friendCard" >
                            <div class="row">
                                <div class="col-md-3 specialFriendPics">
                                    {profileImg.map(users => users._id === user.friendId ? <img class="imgStyling"  src={users.profileImg} alt="profile pic" />: "") }

                                    {/* <img src={user.image} alt="profileImg " class="profileImg" /> */}
                                </div>
                                <div class=" specialFriendName col-md-7 mt-4">

                                    <h3  style={{color: 'white', fontSize: '1.6rem'}} >{user.name}</h3>
                                </div>
                                <div class="col-md-2  mt-4">
                                    <div class="d-flex justify-content-between">
                                        <Link to={'/friendProfile/'+user.friendId}>
                                            <div class="btn myBtn mr-2">View Profile</div>
                                        </Link>
                                        <div class="btn myBtn" onClick={()=>deleteFromFriendList(user._id)}> <i class="fas fa-user-times"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div> ) : 
                        <h4 style={{color: "white"}}>Add people you would like to follow</h4>}

                </div>
            </div>
        </div>
    )
}

export default Friend

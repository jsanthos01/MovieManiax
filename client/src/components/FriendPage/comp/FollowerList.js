import React, { useContext }  from 'react'
import { UserContext } from '../FriendProfilePage';
import { Link } from "react-router-dom";
function FollowerList() {
    const {myFriendList, profileImg} = useContext(UserContext);

    const friendImg = {
        width: '20vh',
        height: '20vh',
        objectFit: 'cover'
    }

    return (
        <div class='tabHeight row'  style={{color : 'white'}}>
            {myFriendList.map(friend=>
            <div class="friendCard mx-auto" >
                <div class="mvHrzCrdDesc">
                    {profileImg.map(user => user._id === friend.friendId ? <img class="hrCdImg"  src={user.profileImg} />: "") }

                    {/* <img src={friend.image} class="crdImg" alt="movie poster" style={friendImg}/> */}
                </div>
                <div class="mvHrzCrdDesc">
                    <p class="movieCrdTitle">{friend.name}</p>  
                    <a class="btn btn-success mr-2" href={'/friendProfile/'+friend.friendId}> View Profile</a>
                </div>
            </div>
            )}
        </div>
    )
}

export default FollowerList

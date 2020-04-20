import React, { useContext }  from 'react'
import { UserContext } from '../FriendProfilePage';

function About() {

    const {friendProfile} = useContext(UserContext);

    return (
        <div  class='tabHeight'>
            <p><i class="far fa-envelope fa-2x"></i> {friendProfile.email}</p>
            <p><i class="fas fa-map-marker-alt fa-2x"></i> {friendProfile.email}</p>
            <p>joined: {friendProfile.createdAt}</p>
            <p><i class="far fa-address-card fa-2x"></i>{friendProfile.bio}</p>
            
        </div>
    )
}

export default About

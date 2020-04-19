import React, { useContext }  from 'react'
import { UserContext } from '../FriendProfilePage';

function About() {

    const {friendProfile} = useContext(UserContext);

    return (
        <div  class='tabHeight'>
            <p><i class="far fa-envelope fa-2x"></i> {friendProfile.email}</p>
            <p><i class="fas fa-map-marker-alt fa-2x"></i> {friendProfile.email}</p>
            <p>joined: {friendProfile.createdAt}</p>
            <p><i class="far fa-address-card fa-2x"></i> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum metus tellus, eget vestibulum metus vulputate eu. Phasellus quis pretium libero. Sed blandit ac odio id congue. Praesent rhoncus tortor eros, at malesuada nunc volutpat porttitor. Ut a odio lorem. Praesent non quam in metus maximus tristique. Phasellus et molestie nulla.

Curabitur quam arcu, facilisis nec maximus sit amet, ullamcorper id leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi dignissim nisl vitae purus laoreet bibendum. Aenean congue nunc id massa imperdiet, at luctus nunc facilisis. Quisque sodales est a dapibus tincidunt. Vestibulum enim quam, dignissim sit amet tortor vitae, bibendum ultricies elit. Nunc eget rhoncus ante, vel porttitor arcu. Morbi porttitor cursus dui, at fermentum orci imperdiet sed. Cras a hendrerit erat.</p>
            
        </div>
    )
}

export default About

import React from 'react'
import './InfoBar.css'
function InfoBar({room}) {
    console.log("Inside InfoBar!", room)
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i class="fas fa-circle onlineIcon"></i>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><i class="fas fa-times"></i></a>
            </div>
        </div>
    )
}

export default InfoBar

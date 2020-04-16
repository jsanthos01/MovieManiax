import React from "react";
import "../style/HomePage.css"

function HomePage(){
    return(
        <div class="HomeMain">  
           <div class="image1"></div>
           <div class="image2"></div>
           <div class="image3"></div>
           <div class="image4"></div>
           <div class="image5"></div>
           <div class="imageContainer">
           </div>
           <div class="HomeContainer">
                <div class="heading">
                   <strong> Movie Maniax</strong>
                </div>
            </div>
            <div class="HomeContainer2">   
                <a class="searchBtn" ><strong>Find a movie</strong></a>
            </div> 

        </div>
    )
}
export default HomePage;
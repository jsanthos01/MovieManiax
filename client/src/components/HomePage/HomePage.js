import React from "react";
import "../style/HomePage.css"

function HomePage(){
    return(
        <div class="homeDiv">
            <div class="container styleCont">
                <h1 class="display-7 title">MovieManiax</h1>
                <p class="words">MOVIES.FUN.POPCORN</p>
                <div class="btnContainer">
                    <a class="searchButton" href="/searchMovie" role="button">Find Your Movies</a>
                </div>
            </div>
        </div>
    )
}
export default HomePage;
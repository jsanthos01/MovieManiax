import React from "react";
import "../style/HomePage.css"

function HomePage(){
    return(
        <div class=" jumbotron jumbotron-fluid homeDiv ">
        <div class="container">
            <h1 class="display-7 title">MovieManiax</h1>
            <p class="para">MOVIES.FUN.POPCORN</p>
            <div class="btnContainer">
             <a class="btn" href="/searchMovie" role="button">Find Your Movies</a>
            </div>
        </div>
        </div>
    )
}
export default HomePage;
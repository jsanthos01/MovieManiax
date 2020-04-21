import React from "react";
import "../style/HomePage.css"
import film from "../assets/film.png"
import popcorn from "../assets/popcorn.png"
import person from "../assets/3d.png"

function HomePage(){
    return(
        <div class="hero2">
            <div class="homeDiv ">
                <div class="container styleCont">
                    <h1 class="display-7 title"><span class="effect">M</span>ovieManiax</h1>
                    <p class="words"><strong><img class="icon" src={film} />MOVIES.<img class="icon" src={person} />FUN.<img class="icon" src={popcorn} />POPCORN</strong></p>
                    <div class="btnContainer">
                        <a class="searchButton" href="/searchMovie" role="button">Find Your Movies</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;
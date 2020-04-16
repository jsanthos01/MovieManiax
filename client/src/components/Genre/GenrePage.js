import React, { useState, useEffect } from "react";
// import action from './assets/action-movie-coloured.png'
import { Link } from "react-router-dom";

function GenrePage() {

    const [ genres, setGenres ]= useState([]);

    async function loadGenres(){
        const apiGenres = await fetch('/api/genre/list').then( result=>result.json() );
        setGenres( apiGenres.genres );
        console.log('apiGenres', apiGenres.genres)
    }

    
        // load only ONCE at component load
        useEffect( function(){
            loadGenres();
        }, [] );
    return (
        <div style={{color: 'white'}} class="container">
            <div class="row">
                {
                    genres.map( genres=>
                    <Link to={'/genre/'+genres.id}>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                <img src={genres.img} alt="genre Img"/>
                                </div>
                                <div class="flip-card-back">
                                    <h3 class='mt-3'>{genres.name}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
                }
            </div>
        </div>
    )
}

export default GenrePage

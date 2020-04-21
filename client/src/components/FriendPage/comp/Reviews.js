import React, { useContext } from 'react'
import { UserContext } from '../FriendProfilePage';

function Reviews() {
    const {myReview} = useContext(UserContext);

    return (
        <div class='tabHeight' style={{color : 'white'}}>
            <div class=' '>
            {myReview.map(review=>
                    <div class="movieHrzCard mx-auto row " >
                        
                        {/* <div class="mvHrzCrdImg">
                        </div> 
                        movieId: {type: String},
                        movieImage: {type: String},
                        comment: {type: String},
                        rating: {type: String},
                        movieName: {type: String}
                        
                        */}
                        <div class="mvHrzCrdDesc">
                            <img src={`https://image.tmdb.org/t/p/w500/${review.movieImage}`} class="hrCdImg " alt="movie poster" />
                        </div>
                        <div class="mvHrzCrdDesc">
                            <h3 class="movieCrdTitle">{review.movieName}</h3>  
                            <p>comment: {review.comment}</p>
                            <p class="ratngCard2"> {review.rating}</p>
                            <a class="btn btn-success mr-2" href={"/movieDetails/" + review.movieId}> View Detail</a>
                        </div>
                    </div>
                )}
                </div>
        </div>
    )
}

export default Reviews

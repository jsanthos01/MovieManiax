import React, { useContext } from 'react'
import { UserContext } from '../FriendProfilePage';

function Reviews() {
    const {myReview} = useContext(UserContext);

    return (
        <div class='tabHeight' style={{color : 'white'}}>
            <div class=' '>
            {myReview.map(review=>
                    <div class="movieCard mx-auto row " >
                        
                        {/* <div class="mvHrzCrdImg">
                        </div> */}
                        <div class="mvHrzCrdDesc col-md-2">
                            <img src={`https://image.tmdb.org/t/p/w500/${review.movieImage}`} class="hrCdImg " alt="movie poster" />
                        </div>
                        <div class="mvHrzCrdDesc col-md-10">
                            <h3>Movie Name</h3>
                            <p class="movieCrdTitle">{review.movieId}</p>  
                            <p>comment: {review.comment}</p>
                            <p class="ratngCard"> {review.rating}</p>
                            {/* <a class="btn btn-success mr-2" href={"/movieDetails/" + review.movieId}> View Detail</a> */}
                        </div>
                    </div>
                )}
                </div>
        </div>
    )
}

export default Reviews
